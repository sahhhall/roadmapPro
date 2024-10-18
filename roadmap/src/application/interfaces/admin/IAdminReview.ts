
import mongoose from "mongoose";
import { Roadmap } from "../../../domain/entities/Roadmap";


export interface IAdminReview {
    execute(data: {
        adminFeedback: string,
        status: string,
        objectId: mongoose.Types.ObjectId
    }): Promise<Roadmap | null>;
}