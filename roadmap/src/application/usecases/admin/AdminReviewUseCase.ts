import mongoose from "mongoose";
import { Roadmap } from "../../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../../domain/interfaces/IRoadMapRepositary";
import { IAdminReview } from "../../interfaces/admin/IAdminReview";




export class AdminReviewUseCase implements IAdminReview {
    constructor(private roadMapRepositary: IRoadMapRepository) { }
    async execute(data: { adminFeedback: string; status: 'published' | 'rejected'; roadmapId: mongoose.Types.ObjectId; }): Promise<Roadmap | null> {
        const { adminFeedback, status, roadmapId } = data;
        const existingRoadmap = await this.roadMapRepositary.getRoadmapById(roadmapId);

        if (!existingRoadmap) {
            return null
        }

        existingRoadmap.status = status;
        existingRoadmap.adminFeedback = adminFeedback;

        const reviwedRoadmap = await this.roadMapRepositary.updateRoadmap(roadmapId, existingRoadmap);
        return reviwedRoadmap
    }
}