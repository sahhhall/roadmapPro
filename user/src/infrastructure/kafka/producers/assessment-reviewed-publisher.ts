import { Publisher, Topics, AssessmentReviewedEvent } from "@sahhhallroadmappro/common";


export class AssessmentReviewedPublisher extends Publisher<AssessmentReviewedEvent> {
    topic: Topics.assessmentReviewed = Topics.assessmentReviewed;
}