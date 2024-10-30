import { KafkaConsumer, MentorApprovedEvent, Topics } from "@sahhhallroadmappro/common";


export class MentorApprovedConsumer extends KafkaConsumer<MentorApprovedEvent> {
    topic: Topics.mentorApproved = Topics.mentorApproved;
    groupId: string = 'mentor-approved-group';

    async onMessage(data: { userId: string; expirience: string; bio: string; headline: string; languages: string[]; githubUrl: string; linkedinUrl: string; }): Promise<void> {
        console.log(data, "from roadmap")
        try {

        } catch (error) {
            console.log('err saving mentor the data db', error);
        }
    }
}