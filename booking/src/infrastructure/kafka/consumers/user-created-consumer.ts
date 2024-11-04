import { KafkaConsumer, UserCreateEvent, Topics } from '@sahhhallroadmappro/common';
import { UserBooking } from '../../database/mongodb/schemas/usermentor.schema';
import { IUserCreatedUseCase } from '../../../application/interfaces/IUserCreatedUseCase';

export class UserCreatedConsumer extends KafkaConsumer<UserCreateEvent> {
    topic: Topics.userCreated = Topics.userCreated;
    groupId: string = 'user-created-group';
    constructor(consumer: any, private userCreatedUseCase: IUserCreatedUseCase) {
        super(consumer);
    }
    async onMessage(data: { id: string; name: string; email: string; role: string; avatar: string; }): Promise<void> {
        console.log(data, "from bookin-service")
        try {
            const userData = {   
                id: data.id,
                role: data.role,
                name: data.name, 
                email: data.email, 
                avatar: data.avatar
            };
           const createdUser = await this.userCreatedUseCase.execute(userData)
           console.log("user created in booking-service",createdUser)
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}