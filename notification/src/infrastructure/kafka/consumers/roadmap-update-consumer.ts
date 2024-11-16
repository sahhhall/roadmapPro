import { KafkaConsumer, RoadMapUpdatedEvent, Topics } from "@sahhhallroadmappro/common";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";
import { IUpdateReadStatusUseCase } from "../../../application/interfaces/IUpdateReadStatusUseCase";
import { ICreateNotificationUseCase } from "../../../application/interfaces/ICreateNotificationUseCase";



export class RoadmapUpdatedConsumer extends KafkaConsumer<RoadMapUpdatedEvent> {
    topic: Topics.roadmapUpdate = Topics.roadmapUpdate;
    groupId: string = 'roadmap-updated-group';
    constructor(consumer: any, private updateBookingStatus: ICreateNotificationUseCase) {
        super(consumer);
    };
    async onMessage(data: {
        type: string,
        message: string,
        userEmail: string
    }): Promise<any> {
        console.log(data, "from roadmap serice")
        try {

        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}