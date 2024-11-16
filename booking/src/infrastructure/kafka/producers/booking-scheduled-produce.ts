//for the expiration like

// when reach time shoudl come back and upadate complete and also right before 30 users should notified




import { Publisher, Topics, BookingScheuduled } from "@sahhhallroadmappro/common";


export class BookingScheduledEvent extends Publisher<BookingScheuduled> {
    topic: Topics.bookingScheuduled = Topics.bookingScheuduled;
}   