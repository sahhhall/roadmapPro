import { KafkaConsumer,ExpirationCompleteEvent,Topics } from "@sahhhallroadmappro/common";



export class ExpirationCompletedConsumer  extends KafkaConsumer<ExpirationCompleteEvent> {
    topic: Topics.expirationCompleted = Topics.expirationCompleted;
    groupId: string = 'expiration-completed-group';
    constructor(consumer: any) {
        super(consumer);
    };
    async onMessage(data: { bookingId: string; }): Promise<void> {
        console.log(data, "from booking serice")
        try {
           
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}