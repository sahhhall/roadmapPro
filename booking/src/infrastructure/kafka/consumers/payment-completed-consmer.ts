import { KafkaConsumer, PaymentCompletedEvent, Topics, BookinStatus } from "@sahhhallroadmappro/common";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";
import { IBookingEventUpdateStatusUseCase } from "../../../application/interfaces/user/IBookingEventUpdateStatusUseCase";


export class PaymentCompletedConsumer extends KafkaConsumer<PaymentCompletedEvent> {
    topic: Topics.paymentCompleted = Topics.paymentCompleted;
    groupId: string = 'payment-completed-group';
    constructor(consumer: any, private updateBookingStatus: IBookingEventUpdateStatusUseCase) {
        super(consumer);
    };

    async onMessage(data: { bookingId: string }): Promise<any> {
        try {
            const updated = await this.updateBookingStatus.execute(data.bookingId, BookinStatus.Scheduled);
            customLogger.debug("booking scheducled success", updated)
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}