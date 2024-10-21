import { KafkaConsumer, UserCreateEvent, Topics } from '@sahhhallroadmappro/common';
import { User } from '../../database/mongodb';

export class UserCreatedConsumer extends KafkaConsumer<UserCreateEvent> {
    topic: Topics = Topics.userCreated;
    groupId: string = 'user-created-group';
    async onMessage(data: { id: string; name: string; email: string; role: string; avatar: string; }): Promise<void> {
        console.log(data, "from roadmap")
        try {
            const user = User.build({
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role,
                avatar: data.avatar
            })
            await user.save();
            console.log('user created successfully', user)
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}