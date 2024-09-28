import { User } from "../../domain/entities/User";
import { IRedisRepository } from "../../domain/interfaces/IRedisRepository";
import { redisClientInstance } from "../redis/ RedisClient";
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
}