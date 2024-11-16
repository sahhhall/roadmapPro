import { Publisher, BookingNotificationEvent, Topics } from "@sahhhallroadmappro/common";


export class BookingNotificationProducer extends Publisher<BookingNotificationEvent> {
    topic: Topics.bookingNotification = Topics.bookingNotification;
}