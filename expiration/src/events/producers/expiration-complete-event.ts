import { Topics,Publisher, ExpirationCompleteEvent } from "@sahhhallroadmappro/common";

export class ExpirationCompleteProduce extends Publisher<ExpirationCompleteEvent> {
    topic: Topics.expirationCompleted= Topics.expirationCompleted;
}
