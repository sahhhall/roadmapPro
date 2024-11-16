import { KafkaConsumer, Topics, BookinStatus, BookingCompletedEvent } from "@sahhhallroadmappro/common";
import { IBookingEventUpdateStatusUseCase } from "../../../application/interfaces/user/IBookingEventUpdateStatusUseCase";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";



export class BookingCompletedConsumer extends KafkaConsumer<BookingCompletedEvent> {
    topic: Topics.bookingCompleted = Topics.bookingCompleted;
    groupId: string = 'booking-completed-group';
    constructor(consumer: any, private updateBookingStatus: IBookingEventUpdateStatusUseCase) {
        super(consumer);
    };
    async onMessage(data: { bookingId: string; }): Promise<any> {
        console.log(data, "from booling completed kakfka serice")
        try {
            const updated = await this.updateBookingStatus.execute(data.bookingId, BookinStatus.Complete);
            customLogger.debug("booking completed success", updated)
        } catch (error) {
            console.log('err change status to complete', error);
        }
    }
}