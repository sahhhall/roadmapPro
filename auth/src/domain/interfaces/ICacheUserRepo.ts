import { User } from "../entities/User";


export interface IRedisRepository {
    saveUnverifiedUser(email: string, user: Pick<User, 'avatar' | 'email' | 'name' | 'password'>): Promise<void>;
    getUnverifiedUser(email: string): Promise<User | null>;
    removeUnverifiedUser(email: string): Promise<void>;
    storeOtp(email: string, otp: string): Promise<void>;
    getOtp(email: string): Promise<string | null>;
    storeToken(token:string, userId: string): Promise<void>;
    verifyToken(token:string): Promise<boolean>;
    deleteToken(token:string): Promise<void>;
}