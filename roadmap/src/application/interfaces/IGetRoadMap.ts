import mongoose from "mongoose";
import { Roadmap } from "../../domain/entities/Roadmap";

export interface IGetRoadMap {
    execute(roadmapId: mongoose.Types.ObjectId): Promise<Roadmap| null>;
}
