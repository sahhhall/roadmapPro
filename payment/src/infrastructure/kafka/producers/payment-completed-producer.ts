import { Publisher, Topics, PaymentCompletedEvent } from "@sahhhallroadmappro/common";

export class PayementCreateProducer extends Publisher<PaymentCompletedEvent> {
    topic: Topics.paymentCompleted = Topics.paymentCompleted;
}