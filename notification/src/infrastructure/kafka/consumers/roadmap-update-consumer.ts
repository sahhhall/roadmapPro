import { KafkaConsumer, RoadMapUpdatedEvent, Topics } from "@sahhhallroadmappro/common";
import { ICreateNotificationUseCase } from "../../../application/interfaces/ICreateNotificationUseCase";
import { ExpressWebServer } from "../../server/express";


export class RoadmapUpdatedConsumer extends KafkaConsumer<RoadMapUpdatedEvent> {
    topic: Topics.roadmapUpdate = Topics.roadmapUpdate;
    groupId: string = 'roadmap-updated-group';
    // private socketService: SocketSvc;
    constructor(consumer: any, private updateBookingStatus: ICreateNotificationUseCase, private expressWebServer: ExpressWebServer) {
        super(consumer);
    };
    async onMessage(data: {
        type: string,
        message: string,
        userEmail: string
    }): Promise<any> {
        console.log(data, "from roadmap serice")
        try {
            await this.updateBookingStatus.execute({
                type: data.type as any,
                message: data.message,
                userMail: data.userEmail
            })

            this.expressWebServer.emitToUser(data.userEmail, {
                type: data.type,
                message: data.message,
            });
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}