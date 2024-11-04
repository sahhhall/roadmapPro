import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepositary";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { UserBooking } from "../database/mongodb/schemas/usermentor.schema";

export class UserRepository implements IUserRepository {
    async create({
        id,
        role,
        name,
        email,
        avatar
    }: {
        id: string;
        role: string;
        name: string;
        email: string;
        avatar?: string;
    }): Promise<any | null> {
        try {
            const newUser = UserBooking.build({
                _id: id,
                role,
                name,
                email,
                avatar
            });
            await newUser.save();
            return newUser
        } catch (error: any) {
            customLogger.error(`db error to save user into booking-service: ${error.message}`);
            throw new Error(`db error: ${error.message}`);
        }
    }


}

