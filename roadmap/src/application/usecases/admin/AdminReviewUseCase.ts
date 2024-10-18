import mongoose from "mongoose";
import { Roadmap } from "../../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../../domain/interfaces/IRoadMapRepositary";
import { IAdminReview } from "../../interfaces/admin/IAdminReview";




export class AdminReviewUseCase implements IAdminReview {
    constructor(private roadMapRepositary: IRoadMapRepository) { }
    async execute(data: { adminFeedback: string; status: 'published' | 'rejected'; objectId: mongoose.Types.ObjectId; }): Promise<Roadmap | null> {
        const { adminFeedback, status, objectId } = data;
        let roadmapId = objectId;
        const existingRoadmap = await this.roadMapRepositary.getRoadmapById(roadmapId);

        if (!existingRoadmap) {
            return null
        }



        const reviwedRoadmap = await this.roadMapRepositary.updateRoadmap(roadmapId, adminFeedback, status);
        return reviwedRoadmap
    }
}