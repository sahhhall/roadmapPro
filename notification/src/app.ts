import { connectDB, disconnectDB } from './infrastructure/database/mongodb/connection';
import { errorHandler, userDtamiddleaware } from '@sahhhallroadmappro/common';
import kafkaWrapper from './infrastructure/kafka/kafka-wrapper';
import loggerMiddleware from './presentation/middleware/loggerMiddleware';
import { IServerInterface } from './domain/interfaces/IServer';
import { notificationRoutes } from './presentation/routes/notificationRoutes';
import { DIContainer } from './infrastructure/di/DIContainer';
import { RoadmapUpdatedConsumer } from './infrastructure/kafka/consumers/roadmap-update-consumer';
import { AssessmentReviewConsumer } from './infrastructure/kafka/consumers/assessment-reviewed-consumer';
import { BookingNotificationConsumer } from './infrastructure/kafka/consumers/booking-notification-consumer';



export class App {
    constructor(private server: IServerInterface) { }
    private roadmapUpdatedConsumer?: RoadmapUpdatedConsumer;
    private assessmentReviewedConsumer?: AssessmentReviewConsumer;
    private bookingNotificationConsumer?: BookingNotificationConsumer;
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
        this.server.registerRoutes('/api/user/notifications', notificationRoutes);

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
            const consumer = await kafkaWrapper.createConsumer('roadmap-updated-group');
            const consumer2 = await kafkaWrapper.createConsumer('assessment-reviwed-group');
            const consumer3 = await kafkaWrapper.createConsumer('booking-notification-group')
            const diContainer = DIContainer.getInstance();
            const genericNotificationCreator = diContainer.createNotificationUseCase();
            this.roadmapUpdatedConsumer = new RoadmapUpdatedConsumer(consumer, genericNotificationCreator);
            this.assessmentReviewedConsumer = new AssessmentReviewConsumer(consumer2, genericNotificationCreator);
            this.bookingNotificationConsumer = new BookingNotificationConsumer(consumer3, genericNotificationCreator)
            await this.roadmapUpdatedConsumer.listen()
            await this.assessmentReviewedConsumer.listen();
            await this.bookingNotificationConsumer.listen();

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