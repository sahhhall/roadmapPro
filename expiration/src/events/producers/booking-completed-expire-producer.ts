import { Topics, Publisher, BookingCompletedEvent } from "@sahhhallroadmappro/common";

export class BookingCompletedProducer extends Publisher<BookingCompletedEvent> {
    topic: Topics.bookingCompleted = Topics.bookingCompleted;
}
