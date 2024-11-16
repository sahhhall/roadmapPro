import { KafkaConsumer, BookingCreatedEvent, Topics, BookingScheuduled } from "@sahhhallroadmappro/common";
import { notificationQueue } from "../../queues/notification-queue";
import { completeBookingQueue } from "../../queues/complete-booking-queue";

export class BookingScheduledConsumer extends KafkaConsumer<BookingScheuduled> {
    topic: Topics.bookingScheuduled = Topics.bookingScheuduled;
    groupId: string = 'expiration-scheduled-service';

    async onMessage(data: { bookingId: string; expiresAt: string; notifiyAt: string, userMail: string }): Promise<void> {
        try {
            console.log("Received after payment booking data:", data);
            const delayForCompleteBooking = new Date(data.expiresAt).getTime() - new Date().getTime();
            const delayForNotifiyBooking = new Date(data.notifiyAt).getTime() - new Date().getTime();
            await notificationQueue.add(
                { bookingId: data.bookingId, userMail: data.userMail },
                { delay: delayForNotifiyBooking }
            );
            await completeBookingQueue.add(
                { bookingId: data.bookingId },
                { delay: delayForCompleteBooking })
        } catch (error) {
            console.log("err processing message:", error);
        }
    }
}
