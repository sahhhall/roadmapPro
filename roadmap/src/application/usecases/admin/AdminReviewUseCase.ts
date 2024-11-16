import mongoose from "mongoose";
import { Roadmap } from "../../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../../domain/interfaces/IRoadMapRepositary";
import { IAdminReview } from "../../interfaces/admin/IAdminReview";
import { RoadmapUpdatedProduer } from "../../../infrastructure/kafka/producer/roadmap-update-producer";
import kafkaWrapper from "../../../infrastructure/kafka/kafka-wrapper";
import { IUserRepository } from "../../../domain/interfaces/IUserRepositary";



export class AdminReviewUseCase implements IAdminReview {
    constructor(private roadMapRepositary: IRoadMapRepository, private userRepo: IUserRepository) { }
    async execute(data: { adminFeedback: string; status: 'published' | 'rejected'; objectId: mongoose.Types.ObjectId; }): Promise<Roadmap | null> {
        const { adminFeedback, status, objectId } = data;
        let roadmapId = objectId;
        const existingRoadmap = await this.roadMapRepositary.getRoadmapById(roadmapId);

        if (!existingRoadmap) {
            return null
        }



        const reviwedRoadmap = await this.roadMapRepositary.updateRoadmap(roadmapId, adminFeedback, status);
        const userData = await this.userRepo.getUserDetails(reviwedRoadmap?.userId as any);
         console.log(userData)
        const message = status === 'published'
            ? `🎉 Your roadmap has been approved by the mentor! 🚀 You're all set to take the next steps in your journey. Keep up the great work! 💪`
            : `❌ Your roadmap approval was rejected by the admin. Unfortunately, it couldn't be published because: ${adminFeedback} 😔 Don't worry, use this feedback to improve and try again! ✨`;
        await new RoadmapUpdatedProduer(kafkaWrapper.producer).produce({
            type: 'Roadmap',
            message: message,
            userEmail: userData?.email as string
        });
        return reviwedRoadmap
    }
}