import { Publisher, Topics, MentorApprovedEvent } from "@sahhhallroadmappro/common";


export class MentorApprovedPublisher extends Publisher<MentorApprovedEvent> {
    topic: Topics.mentorApproved = Topics.mentorApproved;
}