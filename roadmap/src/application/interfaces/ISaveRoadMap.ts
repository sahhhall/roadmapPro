import mongoose from "mongoose";
import { Edge, NodeDetails, NodeEntity, Roadmap } from "../../domain/entities/Roadmap";

export interface ISaveRoadmap {
    execute(data: {
        roadmapId?: mongoose.Types.ObjectId;
        nodes: NodeEntity[];
        edges: Edge[];
        nodeDetails: NodeDetails[];
    }): Promise<Roadmap | null>;
}