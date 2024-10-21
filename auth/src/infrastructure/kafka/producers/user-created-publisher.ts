import { Publisher, Topics, UserCreateEvent } from "@sahhhallroadmappro/common";


export class UserCreatedPublisher extends Publisher<UserCreateEvent>{
    topic: Topics = Topics.userCreated;
}   