import { KafkaConsumer, MentorApprovedEvent, Topics } from "@sahhhallroadmappro/common";
import { IMentorApprovalUseCase } from "../../../application/interfaces/user/IMentorApprovalUseCase";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";
import { mentorRoleUpdatedPublisher } from "../producers/mentor-role-updated-publisher";
import kafkaWrapper from "../kafka-wrapper";


export class MentorApprovedConsumer extends KafkaConsumer<MentorApprovedEvent> {
    topic: Topics.mentorApproved = Topics.mentorApproved;
    groupId: string = 'mentor-approved-group';
    constructor(consumer: any, private mentorApprovalUseCase: IMentorApprovalUseCase) {
        super(consumer);
    }
    async onMessage(data: { userId: string; expirience: string; bio: string; headline: string; languages: string[]; githubUrl: string; linkedinUrl: string; assessedSkills: string[] }): Promise<void> {
        console.log(data, "from roadmap")
        try {
            customLogger.info(`Processing mentor approval for userId: ${data.userId, data.assessedSkills}`);
            const approvedMentor = await this.mentorApprovalUseCase.execute(data);
            // this for update auth service mentor role becuase when user profile navigate it take data
            //from redux so it should update here(auth )
            new mentorRoleUpdatedPublisher(kafkaWrapper.producer).produce({
                userId: approvedMentor!.userId
            })
            console.log(approvedMentor)
        } catch (error) {
            console.log('err saving mentor the data db', error);
        }
    }
}