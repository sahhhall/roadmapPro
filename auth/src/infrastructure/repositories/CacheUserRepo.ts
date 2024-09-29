import { User } from "../../domain/entities/User";
import { IRedisRepository } from "../../domain/interfaces/ICacheUserRepo";
import { redisClientInstance } from "../database/redis/connection";
import { RedisClientType } from 'redis'


export class RedisUserRepository implements IRedisRepository {
    private readonly redisClient: RedisClientType;
    constructor() {
        this.redisClient = redisClientInstance.getClient() as RedisClientType;
    }
    async saveUnverifiedUser(email: string, user: User): Promise<void> {
        await this.redisClient.set(`unverified:${email}`, JSON.stringify(user), { 'EX': 300 });
    }
    async getUnverifiedUser(email: string): Promise<User | null> {
        const user = await this.redisClient.get(`unverified:${email}`);
        return user ? JSON.parse(user) : null;
    }
    async removeUnverifiedUser(email: string): Promise<void> {
        await this.redisClient.del(`unverified:${email}`);
    }

    async storeOtp(email: string, otp: string): Promise<void> {
        await this.redisClient.set(`otp:${email}`, otp, { 'EX': 60 })
    }

    async getOtp(email: string): Promise<string | null> {
        const result = await this.redisClient.get(`otp:${email}`)
        return result ? result : null;
    };

    //for store token forget password

    async storeToken(token: string, userId: string): Promise<void> {
        const tokenKey = `password-reset:${token}`;
        await this.redisClient.set(tokenKey, userId, { EX: 900 })
    }
    async verifyToken(token: string): Promise<any> {
        const tokenKey = `password-reset:${token}`;
        return await this.redisClient.get(tokenKey);
    }
    async deleteToken(token: string): Promise<void> {
        const tokenKey = `password-reset:${token}`;
        await this.redisClient.del(tokenKey);
    }
}