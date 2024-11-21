import { KafkaConsumer, RoadMapUpdatedEvent, Topics } from "@sahhhallroadmappro/common";
import { ICreateNotificationUseCase } from "../../../application/interfaces/ICreateNotificationUseCase";
import { ExpressWebServer } from "../../server/express";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";


export class RoadmapUpdatedConsumer extends KafkaConsumer<RoadMapUpdatedEvent> {
    topic: Topics.roadmapUpdate = Topics.roadmapUpdate;
    groupId: string = 'roadmap-updated-group';

    constructor(consumer: any, private roadmapReviewUpdate: ICreateNotificationUseCase, private expressWebServer: ExpressWebServer) {
        super(consumer);
    };
    
    async onMessage(data: {
        type: string,
        message: string,
        userEmail: string
    }): Promise<any> {
        try {
              //for stroring(when roadmap status update(both reject and accept) ) notification in database
            await this.roadmapReviewUpdate.execute({
                type: data.type as any,
                message: data.message,
                userMail: data.userEmail
            })
            //real time update for socket
            this.expressWebServer.emitToUser(data.userEmail, {
                type: data.type,
                message: data.message,
            });
        } catch (error) {
            customLogger.error("roadmap-consumer error",error)
        }
    }
}