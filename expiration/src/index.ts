import kafkaWrapper from "./kafka-wrapper";



const start = async () => {
    try {
        await kafkaWrapper.connect();
        await kafkaWrapper.createConsumer('expiration-service');
        console.log("Kafka setup complete");
    } catch (error) {
        console.log("Error starting the service:", error);
    }
};