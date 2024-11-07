import { KafkaConsumer, BookingCreatedEvent, Topics } from "@sahhhallroadmappro/common";
import { expirationQueue } from "../../queues/expiration-queue";

export class BookingCreatedConsumer extends KafkaConsumer<BookingCreatedEvent> {
    topic: Topics.bookingCreated = Topics.bookingCreated;
    groupId: string = 'expiration-service';

    async onMessage(data: { bookingId: string; expiresAt: string }): Promise<void> {
        try {
            console.log("Received booking data:", data);
            const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
            await expirationQueue.add(
                { bookingId: data.bookingId },
                { delay }
            );
        } catch (error) {
            console.log("Error processing message:", error);
        }
    }
}
