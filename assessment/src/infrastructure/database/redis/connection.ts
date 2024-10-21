import { createClient } from "redis";
import redis from 'redis'
class Redis {
    private readonly redisClient: ReturnType<typeof createClient>;
    constructor() {
        this.redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        })
        this.redisClient.on('error',(err)=> {
            console.log('Redis client error', err)
        })
    }

    public async connect(): Promise<void> {
        await this.redisClient.connect();
        console.log("connected to redis")
    }
    public getClient() {
        return this.redisClient;
    }

}

export const redisClientInstance = new Redis()