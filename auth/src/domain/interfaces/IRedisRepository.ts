import { User } from "../entities/User";


export interface IRedisRepository {
    saveUnverifiedUser(email: string, user: Pick<User, 'avatar' | 'email' | 'name' | 'password'>):Promise<void>;
    getUnverifiedUser(email: string): Promise<User | null>;
    removeUnverifiedUser(email: string): Promise<void>;
    storeOtp(email:string, otp:string): Promise<void>;
}