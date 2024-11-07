
import Queue from "bull";
import kafkaWrapper from "../kafka-wrapper";
import { ExpirationCompleteProduce } from "../events/producers/expiration-complete-event";

interface Payload {
    bookingId: string;
}

const expirationQueue = new Queue<Payload>("booking:expiration", {
    redis: {
        host: process.env.REDIS_HOST,
    },
});
console.log(expirationQueue,"expiration")

const processBookings = new Set<string>();
console.log(processBookings)

//when delay up i mean it over that will move to here process i mean this process will trigger
expirationQueue.process(async (job) => {
    console.log(job,"job")
    if (processBookings.has(job.data.bookingId)) {
        return;
    }

    processBookings.add(job.data.bookingId);

    console.log(`Processing expiration for booking ID: ${job.data.bookingId}`);
    await new ExpirationCompleteProduce(kafkaWrapper.producer).produce({
        bookingId: job.data.bookingId
    })

});

export { expirationQueue };