import { connectDB, disconnectDB } from './infrastructure/database/mongodb/connection';
import { errorHandler, userDtamiddleaware } from '@sahhhallroadmappro/common';
import kafkaWrapper from './infrastructure/kafka/kafka-wrapper';
import loggerMiddleware from './presentation/middleware/loggerMiddleware';
import { IServerInterface } from './domain/interfaces/IServer';
import { userRoutes } from './presentation/routes/user/userRoutes';
import { grpcService } from './infrastructure/rpc/grpc/server';
import { MentorApprovedConsumer } from './infrastructure/kafka/consumers/mentor-approved-consumer';
import { DIContainer } from './infrastructure/di/DIContainer';
import { mentorRoutes } from './presentation/routes/mentor/mentorRoutes';



export class App {
    private mentorApprovedConsumer?: MentorApprovedConsumer;
    constructor(private server: IServerInterface) { }

    async initialize(): Promise<void> {
        this.registerMiddleware()
        this.registerRoutes();
        this.registerErrorHandler();
        await this.connectDB();
        await this.connectKafka();
        await this.connectGrpc();
    }

    private registerMiddleware(): void {
        this.server.registerMiddleware(loggerMiddleware)
        this.server.registerMiddleware(userDtamiddleaware);
    }

    private registerRoutes(): void {
        this.server.registerRoutes('/api/user', userRoutes);
        this.server.registerRoutes('/api/mentor', mentorRoutes)

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
            const consumer = await kafkaWrapper.createConsumer('mentor-approved-group');

            const diContainer = DIContainer.getInstance();
            const mentorApprovalUseCase = diContainer.mentorApprovalUseCase();
            const getUserDetails = diContainer.getUserDetailsUseCase();
            this.mentorApprovedConsumer = new MentorApprovedConsumer(
                consumer,
                mentorApprovalUseCase,
                getUserDetails
            );
            await this.mentorApprovedConsumer.listen()
        } catch (error) {
            console.log('some err connect with kafka', error);
        }
    }
    private async connectGrpc(): Promise<void> {
        try {
            await grpcService.start();
            console.log('gRPC server started successfully.');
        } catch (error) {
            console.error('Failed to start gRPC server:', error);
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