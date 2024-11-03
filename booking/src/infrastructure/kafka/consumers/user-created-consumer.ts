import { KafkaConsumer, UserCreateEvent, Topics } from '@sahhhallroadmappro/common';
import { UserBooking } from '../../database/mongodb/schemas/usermentor.schema';

export class UserCreatedConsumer extends KafkaConsumer<UserCreateEvent> {
    topic: Topics.userCreated = Topics.userCreated;
    groupId: string = 'user-created-group';
    async onMessage(data: { id: string; name: string; email: string; role: string; avatar: string; }): Promise<void> {
        console.log(data, "from roadmap")
        try {
            
           
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}