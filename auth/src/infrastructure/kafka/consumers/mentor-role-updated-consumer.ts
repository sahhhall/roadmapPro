import { KafkaConsumer,MentorRoleUpdatedEvent, Topics } from "@sahhhallroadmappro/common";
import {IUpdateAuthRole} from '../../../application/interfaces/IUpdateAuthRole'

export class MentorRoleUpdatedConsumer extends KafkaConsumer<MentorRoleUpdatedEvent> {
    topic: Topics.mentorRoleUpdated = Topics.mentorRoleUpdated;
    groupId: string = 'mentor-role-update-group';
    constructor(consumer: any, private mentorRoleUpdateUseCase: IUpdateAuthRole) {
        super(consumer);
    }
    async onMessage(data: { userId: string;}): Promise<void> {
        console.log(data, "from roadmap")
        try {
            console.log(`Processing mentor approval for userId: ${data.userId}`);
            const approvedMentor = await this.mentorRoleUpdateUseCase.execute(data.userId);
            console.log(approvedMentor,"approved")
        } catch (error) {
            console.log('err saving mentor the data db', error);
        }
    }
}