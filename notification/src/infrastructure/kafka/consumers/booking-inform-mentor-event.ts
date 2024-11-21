import { KafkaConsumer, Topics, BookingInformEvent } from "@sahhhallroadmappro/common";
import { ICreateNotificationUseCase } from "../../../application/interfaces/ICreateNotificationUseCase";
import { ExpressWebServer } from "../../server/express";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";



export class BookingInformConsumer extends KafkaConsumer<BookingInformEvent> {
    topic: Topics.informNotification = Topics.informNotification;
    groupId: string = 'booking-inform-group';
    constructor(consumer: any, private updateBookingStatus: ICreateNotificationUseCase, private expressWebServer: ExpressWebServer) {
        super(consumer);
    };
    async onMessage(data: {
        mentorEmail: string;
        type: string,
        message: string,
    }): Promise<any> {
        try {
            //for stroring booking status (for reminder) notification in database
            await this.updateBookingStatus.execute({
                type: data.type as any,
                message: data.message,
                userMail: data.mentorEmail
            })
            //real time update for notification
            this.expressWebServer.emitToUser(data.mentorEmail, {
                type: data.type,
                message: data.message,
            });
        } catch (error) {
            customLogger.error("booking-consumer error", error)
        }
    }
}