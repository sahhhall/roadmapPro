import { errorHandler, userDtamiddleaware } from '@sahhhallroadmappro/common';
import kafkaWrapper from './infrastructure/kafka/kafka-wrapper';
import loggerMiddleware from './presentation/middleware/loggerMiddleware';
import { IServerInterface } from './domain/interfaces/IServer';
import { paymentRoutes } from './presentation/routes/paymentRoutes';
import { connectDB } from './infrastructure/database/sql/connection';



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
        this.server.registerMiddleware(userDtamiddleaware);
    }

    private registerRoutes(): void {
        this.server.registerRoutes('/api/payments',paymentRoutes)

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