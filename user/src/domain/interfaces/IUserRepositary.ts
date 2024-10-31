import { User } from "../../domain/entities/User";

export interface IUserRepository {
    updateUserProfile(userId: string): Promise<User | null>;
    getUserDetails(userId: string): Promise<User | null>;
}
