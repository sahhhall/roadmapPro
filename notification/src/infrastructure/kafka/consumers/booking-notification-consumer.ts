import { KafkaConsumer, BookingNotificationEvent, Topics } from "@sahhhallroadmappro/common";
import { ICreateNotificationUseCase } from "../../../application/interfaces/ICreateNotificationUseCase";
import { ExpressWebServer } from "../../server/express";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";



export class BookingNotificationConsumer extends KafkaConsumer<BookingNotificationEvent> {
    topic: Topics.bookingNotification = Topics.bookingNotification;
    groupId: string = 'booking-notification-group';
    constructor(consumer: any, private updateBookingStatus: ICreateNotificationUseCase, private expressWebServer: ExpressWebServer) {
        super(consumer);
    };
    async onMessage(data: {
        type: string,
        message: string,
        userEmail: string
    }): Promise<any> {
        try {
            //for stroring booking status (for reminder) notification in database
            await this.updateBookingStatus.execute({
                type: data.type as any,
                message: data.message,
                userMail: data.userEmail
            })
            //real time update for notification
            this.expressWebServer.emitToUser(data.userEmail, {
                type: data.type,
                message: data.message,
            });
        } catch (error) {
            customLogger.error("booking-consumer error",error)
        }
    }
}