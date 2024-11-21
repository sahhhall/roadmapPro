
import { Publisher, Topics, BookingInformEvent } from "@sahhhallroadmappro/common";


export class BookingInformProducer extends Publisher<BookingInformEvent> {
    topic: Topics.informNotification = Topics.informNotification;
}   