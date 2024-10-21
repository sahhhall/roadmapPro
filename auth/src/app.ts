import { authRoutes } from './presentation/routes/authRoutes';
import { connectDB, disconnectDB } from './infrastructure/database/mongodb/connection';
import { redisClientInstance } from './infrastructure/database/redis/connection';
import { adminAuthRoutes } from './presentation/routes/adminAuthRoutes';
import { errorHandler } from '@sahhhallroadmappro/common';
import { IServerInterface } from './domain/interfaces/IServer';
import loggerMiddleware from './presentation/middlewares/loggerMiddleware';
import kafkaWrapper from './infrastructure/kafka/kafka-wrapper';

export class App {
    constructor(private server: IServerInterface) { }

    async initialize(): Promise<void> {
        this.registerMiddleware()
        this.registerRoutes();
        this.registerErrorHandler();
        await this.connectDB();
        await this.connectKafka();
    }

    private registerMiddleware(): void {
        this.server.registerMiddleware(loggerMiddleware)
    }

    private registerRoutes(): void {
        this.server.registerRoutes('/api/auth', authRoutes)
        this.server.registerRoutes('/api/admin', adminAuthRoutes);
    }
    private registerErrorHandler(): void {
        this.server.registerErrorHandler(errorHandler as any);
    }
    private async connectDB() {
        try {
            await connectDB();
            await redisClientInstance.connect();
        } catch (error) {
            console.log('Server could not be started', error);
            process.exit(1);
        }
    }

    private async connectKafka() {
        try {
            await kafkaWrapper.connect();
        } catch (error) {
            console.log('some err connect with kafka', error);
        }
    }

    async start(port: number): Promise<void> {
        await this.server.start(port)
    }

    async shutdown(): Promise<void> {
        console.log("shut down server");
        await disconnectDB();
        await kafkaWrapper.disconnectFromKafka();
        //need addd connection closes to  redis and db lateron
    }
}



export default App;