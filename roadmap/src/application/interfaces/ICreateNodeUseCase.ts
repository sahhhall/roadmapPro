
import mongoose from "mongoose";
import { NodeEntity } from "../../domain/entities/Roadmap";

export interface ICreateNodeUseCase {
    execute(data: {
        data: string,
        position: any,
        type: string,
        roadmapId: mongoose.Types.ObjectId
    }): Promise<NodeEntity | null>;
}