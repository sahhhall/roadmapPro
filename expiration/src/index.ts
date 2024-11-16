import { BookingCreatedConsumer } from "./events/consumers/booking-created-consumer";
import { BookingScheduledConsumer } from "./events/consumers/booking-scheduled-consumer";
import kafkaWrapper from "./kafka-wrapper";



const start = async () => {
    try {
        await kafkaWrapper.connect();
        const consumer = await kafkaWrapper.createConsumer('expiration-service');
        const consumer2 = await kafkaWrapper.createConsumer('expiration-scheduled-service');
        const bookingCreatedConsumer = new BookingCreatedConsumer(consumer);
        const bookingScheduledConsumer = new BookingScheduledConsumer(consumer2)
        await bookingCreatedConsumer.listen()
        await bookingScheduledConsumer.listen()
        console.log("Kafka setup complete");
    } catch (error) {
        console.log("Error starting the service:", error);
    }
};


start();