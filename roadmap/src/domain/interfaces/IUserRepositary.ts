import { User } from "../entities/User";

export interface IUserRepository {
    getUserDetails(userId: string): Promise<User | null>;   
}
