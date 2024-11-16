import { KafkaConsumer, PaymentCompletedEvent, Topics, BookinStatus } from "@sahhhallroadmappro/common";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";
import { IBookingEventUpdateStatusUseCase } from "../../../application/interfaces/user/IBookingEventUpdateStatusUseCase";
import kafkaWrapper from "../kafka-wrapper";
import { BookingScheduledEvent } from "../producers/booking-scheduled-produce";

const EXPIRATION_ADDITIONAL_HOURS = 1 * 60 * 60;
const NOTIFICATION_BEFORE_MINUTES = 30 * 60;

export class PaymentCompletedConsumer extends KafkaConsumer<PaymentCompletedEvent> {
    topic: Topics.paymentCompleted = Topics.paymentCompleted;
    groupId: string = 'payment-completed-group';
    constructor(consumer: any, private updateBookingStatus: IBookingEventUpdateStatusUseCase) {
        super(consumer);
    };

    async onMessage(data: { bookingId: string }): Promise<any> {
        try {
            const updated = await this.updateBookingStatus.execute(data.bookingId, BookinStatus.Scheduled);

            //for the booking end dat
            const bookedDate = new Date(`${updated}:00`);

            const expirationDate = new Date(bookedDate);
            expirationDate.setSeconds(bookedDate.getSeconds() + EXPIRATION_ADDITIONAL_HOURS);

            const notificationDate = new Date(bookedDate);
            notificationDate.setSeconds(bookedDate.getSeconds() - NOTIFICATION_BEFORE_MINUTES);

            // for lack of time i didnt added useroriginal mail now for testing purpose i put myself
            // and i focused now on completed booking
            await new BookingScheduledEvent(kafkaWrapper.producer).produce({
                bookingId: data.bookingId,
                expiresAt: expirationDate as any,
                notifiyAt: notificationDate as any,
                userMail: 'sahalvavoor313@gmail.com'
            })


            customLogger.debug("booking scheducled success", updated)
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}