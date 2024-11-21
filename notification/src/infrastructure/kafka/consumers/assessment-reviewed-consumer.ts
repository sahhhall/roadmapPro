import { AssessmentReviewedEvent, KafkaConsumer, Topics } from "@sahhhallroadmappro/common";
import { ICreateNotificationUseCase } from "../../../application/interfaces/ICreateNotificationUseCase";
import { ExpressWebServer } from "../../server/express";
import { customLogger } from "../../../presentation/middleware/loggerMiddleware";



export class AssessmentReviewConsumer extends KafkaConsumer<AssessmentReviewedEvent> {
    topic: Topics.assessmentReviewed = Topics.assessmentReviewed;
    groupId: string = 'assessment-reviwed-group';
    constructor(consumer: any, private assesmentNotificationCreate: ICreateNotificationUseCase, private expressWebServer: ExpressWebServer) {
        super(consumer);
    };
    async onMessage(data: {
        type: string,
        message: string,
        userEmail: string
    }): Promise<any> {
        // for storing  only when he pass  notification in database 
        try {
            await this.assesmentNotificationCreate.execute({
                type: data.type as any,
                message: data.message,
                userMail: data.userEmail
            })
            //for emiting real time socket
            this.expressWebServer.emitToUser(data.userEmail, {
                type: data.type,
                message: data.message,
            });
        } catch (error) {
            customLogger.error("assessmen-consumer error", error)
        }
    }
}