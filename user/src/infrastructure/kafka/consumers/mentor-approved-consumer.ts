import { KafkaConsumer, MentorApprovedEvent, Topics } from "@sahhhallroadmappro/common";
import { IMentorApprovalUseCase } from "../../../application/interfaces/user/IMentorApprovalUseCase";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";
import { mentorRoleUpdatedPublisher } from "../producers/mentor-role-updated-publisher";
import kafkaWrapper from "../kafka-wrapper";
import { AssessmentReviewedPublisher } from "../producers/assessment-reviewed-publisher";
import { IGetUserDetailsUseCase } from "../../../application/interfaces/user/IGetUserDetailsUseCase";


export class MentorApprovedConsumer extends KafkaConsumer<MentorApprovedEvent> {
    topic: Topics.mentorApproved = Topics.mentorApproved;
    groupId: string = 'mentor-approved-group';
    constructor(consumer: any, private mentorApprovalUseCase: IMentorApprovalUseCase, private userDetails: IGetUserDetailsUseCase) {
        super(consumer);
    }
    async onMessage(data: { userId: string; expirience: string; bio: string; headline: string; languages: string[]; githubUrl: string; linkedinUrl: string; assessedSkills: string[] }): Promise<void> {
        try {
            //for passnig userdata to notification service
            const user = await this.userDetails.execute(data.userId)
            const approvedMentor = await this.mentorApprovalUseCase.execute(data);

            await new AssessmentReviewedPublisher(kafkaWrapper.producer).produce({
                type: 'Assessment',
                message: `Great news, ${user?.name}! \n\nYou've officially passed the mentor assessment!  We're thrilled to welcome you as a mentor 🥂`,
                userEmail: user?.email as string
            });
            // this for update auth service mentor role becuase when user profile navigate it take data
            //from redux so it should update here(auth )
            new mentorRoleUpdatedPublisher(kafkaWrapper.producer).produce({
                userId: approvedMentor!.userId
            })
        } catch (error) {
            customLogger.error('err saving mentor the data db', error);
        }
    }
}