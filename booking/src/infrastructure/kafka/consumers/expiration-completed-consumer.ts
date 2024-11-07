import { KafkaConsumer, ExpirationCompleteEvent, Topics, BookinStatus } from "@sahhhallroadmappro/common";
import { IBookingEventUpdateStatusUseCase } from "../../../application/interfaces/user/IBookingEventUpdateStatusUseCase";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";



export class ExpirationCompletedConsumer extends KafkaConsumer<ExpirationCompleteEvent> {
    topic: Topics.expirationCompleted = Topics.expirationCompleted;
    groupId: string = 'expiration-completed-group';
    constructor(consumer: any, private updateBookingStatus: IBookingEventUpdateStatusUseCase) {
        super(consumer);
    };
    async onMessage(data: { bookingId: string; }): Promise<any> {
        console.log(data, "from booking serice")
        try {
            const updated = await this.updateBookingStatus.execute(data.bookingId, BookinStatus.Cancelled);
            customLogger.debug("booking cancelled success", updated)
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}