
import Queue from "bull";
import kafkaWrapper from "../kafka-wrapper";
import { BookingNotificationProducer } from "../events/producers/booking-notification-producer";
interface Payload {
    bookingId: string;
    userMail: string;
}

const notificationQueue = new Queue<Payload>("booking:notification", {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

//when delay up i mean it over that will move to here process i mean this process will triggernotificationQueue.process(async (job) => {
notificationQueue.process(async (job) => {
    console.log(`Processing notification for booking ID: ${job.data.bookingId}`);
    await new BookingNotificationProducer(kafkaWrapper.producer).produce({
        userEmail: job.data.userMail,
        message: ` Hi there,

        Just a quick reminder: your booking (ID: ${job.data.bookingId}) is coming up soon! 

        Please ensure everything is ready and let us know if you need any assistance. We’re here to help!

        Have a great day,  
        The Booking Team `,
        type: 'Booking'
    });
});


export { notificationQueue };