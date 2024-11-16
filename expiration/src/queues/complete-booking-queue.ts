
import Queue from "bull";
import kafkaWrapper from "../kafka-wrapper";
import { BookingCompletedProducer } from "../events/producers/booking-completed-expire-producer";
interface Payload {
    bookingId: string;
}

const completeBookingQueue = new Queue<Payload>("booking:complete", {
    redis: {
        host: process.env.REDIS_HOST,
    },
});


completeBookingQueue.process(async (job) => {
    console.log(`Processing completion for booking ID: ${job.data.bookingId}`);
    await new BookingCompletedProducer(kafkaWrapper.producer).produce({
        bookingId: job.data.bookingId
    })
});


export { completeBookingQueue };