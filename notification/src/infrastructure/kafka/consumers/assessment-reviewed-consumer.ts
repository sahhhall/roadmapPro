import { AssessmentReviewedEvent, KafkaConsumer, Topics } from "@sahhhallroadmappro/common";
import { ICreateNotificationUseCase } from "../../../application/interfaces/ICreateNotificationUseCase";



export class AssessmentReviewConsumer extends KafkaConsumer<AssessmentReviewedEvent> {
    topic: Topics.assessmentReviewed = Topics.assessmentReviewed;
    groupId: string = 'assessment-reviwed-group';
    constructor(consumer: any, private updateBookingStatus: ICreateNotificationUseCase) {
        super(consumer);
    };
    async onMessage(data: {
        type: string,
        message: string,
        userEmail: string
    }): Promise<any> {
        console.log(data, "from roadmap serice to asseessmet")
        try {
            const res = await this.updateBookingStatus.execute({
                type: data.type as any,
                message: data.message,
                userMail: data.userEmail
            })
        } catch (error) {
            console.log('err saving user the data db', error);
        }
    }
}