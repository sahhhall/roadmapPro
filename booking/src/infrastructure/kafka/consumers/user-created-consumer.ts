import { KafkaConsumer, UserCreateEvent, Topics } from '@sahhhallroadmappro/common';
import { IUserCreatedUseCase } from '../../../application/interfaces/IUserCreatedUseCase';
import { customLogger } from '../../../presentation/middleware/loggerMiddleware';

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
           customLogger.debug("user created in booking-service",createdUser)
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}