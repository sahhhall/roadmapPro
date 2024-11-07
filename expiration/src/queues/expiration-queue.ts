
import Queue from "bull";
import kafkaWrapper from "../kafka-wrapper";

interface Payload {
    bookingId: string;
}

const expirationQueue = new Queue<Payload>("booking:expiration", {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

const processBookings = new Set();

expirationQueue.process(async (job) => {
    if (processBookings.has(job.data.bookingId)) {
        return;
    }

    processBookings.add(job.data.bookingId);

    console.log(`Processing expiration for booking ID: ${job.data.bookingId}`);

  
});

export { expirationQueue };