
import mongoose from "mongoose";
import { Roadmap } from "../../../domain/entities/Roadmap";


export interface IAdminReview {
    execute(data: {
        adminFeedback: string,
        status: string,
        roadmapId: mongoose.Types.ObjectId
    }): Promise<Roadmap | null>;
}