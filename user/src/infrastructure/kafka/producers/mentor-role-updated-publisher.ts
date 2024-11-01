import { MentorRoleUpdatedEvent, Publisher, Topics, } from "@sahhhallroadmappro/common";


export class mentorRoleUpdatedPublisher extends Publisher<MentorRoleUpdatedEvent> {
    topic: Topics.mentorRoleUpdated = Topics.mentorRoleUpdated;
}   