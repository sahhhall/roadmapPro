import { BookingCreatedConsumer } from "./events/consumers/booking-created-consumer";
import kafkaWrapper from "./kafka-wrapper";



const start = async () => {
    try {
        await kafkaWrapper.connect();
        const consumer = await kafkaWrapper.createConsumer('expiration-service');
        const bookingCreatedConsumer = new BookingCreatedConsumer(consumer);
        await bookingCreatedConsumer.listen()
        console.log("Kafka setup complete");
    } catch (error) {
        console.log("Error starting the service:", error);
    }
};


start();