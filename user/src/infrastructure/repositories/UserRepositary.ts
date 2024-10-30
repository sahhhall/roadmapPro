import { User } from "../../domain/entities/User";
import { Profile as UserDB } from "../database/mongodb/schemas/user.schema";

import { customLogger } from "../../presentation/middleware/loggerMiddleware";

export class UserRepository {
    async create({
        userId, email, name, isGoogle, avatar,
    }: { userId: string, email: string, name: string, isGoogle: boolean, avatar: string }): Promise<User> {
        try {
            const newUser = UserDB.build({
                _id: userId,
                email,
                name,
                isGoogle,
                avatar,
            });
            return await newUser.save();
        } catch (error: any) {
            customLogger.error(`db error: ${error.message}`);
            throw new Error(`db error: ${error.message}`);
        }
    }
}

