import { KafkaConsumer, BookingNotificationEvent, Topics } from "@sahhhallroadmappro/common";
import { ICreateNotificationUseCase } from "../../../application/interfaces/ICreateNotificationUseCase";



export class BookingNotificationConsumer extends KafkaConsumer<BookingNotificationEvent> {
    topic: Topics.bookingNotification = Topics.bookingNotification;
    groupId: string = 'booking-notification-group';
    constructor(consumer: any, private updateBookingStatus: ICreateNotificationUseCase) {
        super(consumer);
    };
    async onMessage(data: {
        type: string,
        message: string,
        userEmail: string
    }): Promise<any> {
        console.log(data, "from before 30 minure scheduler")
        try {
            await this.updateBookingStatus.execute({
                type: data.type as any,
                message: data.message,
                userMail: data.userEmail
            })
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}