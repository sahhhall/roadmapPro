import { connectDB } from './infrastructure/database/mongodb/connection';
import { errorHandler } from '@sahhhallroadmappro/common';
import { router } from './presentation/routes/roadmap';
import loggerMiddleware from './presentation/middlewares/loggerMiddleware';
import { adminRoutes } from './presentation/routes/adminRoutes';
import { IServerInterface } from './domain/interfaces/IServer';
import kafkaWrapper from './infrastructure/kafka/kafka-wrapper';
import { UserCreatedConsumer } from './infrastructure/kafka/consumer/user-created-consumer';


export class App {
    private userCreatedConsumer?: UserCreatedConsumer;
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
        this.server.registerRoutes('/api/roadmap', router)
        this.server.registerRoutes('/api/admin/roadmap', adminRoutes)
    }
    private registerErrorHandler(): void {
        this.server.registerErrorHandler(errorHandler as any);
    }
    private async connectDB() {
        try {
            await connectDB();
        } catch (error) {
            console.log('Server could not be started', error);
            process.exit(1);
        }
    }
    private async connectKafka() {
        try {
            await kafkaWrapper.connect();
            const consumer = await kafkaWrapper.createConsumer('user-created-group');
            this.userCreatedConsumer = new UserCreatedConsumer(consumer);
            await this.userCreatedConsumer.listen()
        } catch (error) {
            console.log('some err connect with kafka', error);
        }
    }


    async start(port: number): Promise<void> {
        await this.server.start(port)
    }

    async shutdown(): Promise<void> {
        console.log("shut down server");
        await kafkaWrapper.disconnectFromKafka();
        //need addd connection closes to  redis and db lateron
    }
}



export default App;