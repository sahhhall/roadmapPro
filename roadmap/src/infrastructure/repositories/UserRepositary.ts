import { User as UserDB } from '../../infrastructure/database/mongodb/schemas/user.schema'
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepositary";
import { customLogger } from '../../presentation/middlewares/loggerMiddleware';


export class UserRepositary implements IUserRepository {

    async getUserDetails(userId: string): Promise<User | null> {
        try {         
            const user = await UserDB.findOne({ id: userId })
            return user
        } catch (error: any) {
            customLogger.error(`db error to find roadmaps booking booking-service: ${error.message}`);
            throw new Error(`db error to find roadmaps booking booking-service: ${error.message}`);
        }
    }
}