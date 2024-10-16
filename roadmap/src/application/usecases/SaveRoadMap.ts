import { Types } from "mongoose";
import { NodeEntity, Edge, NodeDetails, Roadmap } from "../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { ISaveRoadmap } from "../interfaces/ISaveRoadMap";




export class SaveRoadmap implements ISaveRoadmap {
    constructor( private roadmapRepositary: IRoadMapRepository ) {}

    async execute(data: { roadmapId: Types.ObjectId; nodes: NodeEntity[]; edges: Edge[]; nodeDetails: NodeDetails[]; }): Promise<Roadmap | null> {
        const { roadmapId, nodes, edges, nodeDetails } = data;
        const updatedRoadmap = await this.roadmapRepositary.saveRoadmap(roadmapId, nodes, edges, nodeDetails);
        return updatedRoadmap
    }
}