import { connectDB, disconnectDB } from './infrastructure/database/mongodb/connection';
import { errorHandler, userDtamiddleaware } from '@sahhhallroadmappro/common';
import kafkaWrapper from './infrastructure/kafka/kafka-wrapper';
import loggerMiddleware from './presentation/middleware/loggerMiddleware';
import { IServerInterface } from './domain/interfaces/IServer';
import { availabilityRoutes } from './presentation/routes/availbilityRoutes';
import { UserCreatedConsumer } from './infrastructure/kafka/consumers/user-created-consumer';
import { DIContainer } from './infrastructure/di/DIContainer';
import { bookingRoutes } from './presentation/routes/bookingRoutes';
import { ExpirationCompletedConsumer } from './infrastructure/kafka/consumers/expiration-completed-consumer';



export class App {
    private userCreatedConsumer?: UserCreatedConsumer;
    private bookingExpiration?: ExpirationCompletedConsumer;
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
        this.server.registerRoutes('/api/mentors/availability', availabilityRoutes);
        this.server.registerRoutes('/api/bookings', bookingRoutes);

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
            const consumer = await kafkaWrapper.createConsumer('booking-service-group');
            const consumer2 = await kafkaWrapper.createConsumer('expiration-completed-group')
            const diContainer = DIContainer.getInstance();
            const userCreatedUseCase = diContainer.userCreatedUseCase();
            const updateStatusExipredBookings = diContainer.updateStatusExipiredBooking();
            this.userCreatedConsumer = new UserCreatedConsumer(
                consumer,
                userCreatedUseCase
            );
            this.bookingExpiration = new ExpirationCompletedConsumer(consumer2, updateStatusExipredBookings);
            await this.bookingExpiration.listen();
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
        await disconnectDB();
        await kafkaWrapper.disconnectFromKafka();
        //need addd connection closes to  redis and db lateron
    }
}



export default App;