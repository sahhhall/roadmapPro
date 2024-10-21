import {KafkaConsumer, UserCreateEvent, Topics} from '@sahhhallroadmappro/common';


export class UserCreatedConsumer extends KafkaConsumer<UserCreateEvent> {
    topic: Topics = Topics.userCreated;
    groupId: string = 'user-created-group';
    async onMessage(data: { id: string; name: string; email: string; role: string; avatar: string; }): Promise<void> {
        console.log(data,"from roadmap")
    }
}