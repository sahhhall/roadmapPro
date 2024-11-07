import { Publisher, Topics, BookingCreatedEvent } from "@sahhhallroadmappro/common";


export class BookingCreatedProducer extends Publisher<BookingCreatedEvent> {
    topic: Topics.bookingCreated = Topics.bookingCreated;
}   