import { User } from "../../domain/entities/User";

export interface IUserRepository {
    //this for kafka when user role change
    updateUserProfile(userId: string): Promise<User | null>;
    getUserDetails(userId: string): Promise<User | null>;

    updateUserProfileData(userId: string, data: { name?: string, avatar?: string }): Promise<User | null>;
}
