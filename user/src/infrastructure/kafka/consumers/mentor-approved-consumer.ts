import { KafkaConsumer, MentorApprovedEvent, Topics } from "@sahhhallroadmappro/common";
import { IMentorApprovalUseCase } from "../../../application/interfaces/user/IMentorApprovalUseCase";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";
import mongoose from "mongoose";


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
            console.log(approvedMentor)
        } catch (error) {
            console.log('err saving mentor the data db', error);
        }
    }
}