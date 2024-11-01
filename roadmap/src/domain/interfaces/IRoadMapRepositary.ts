import mongoose from "mongoose";
import { Roadmap, Edge, NodeDetails, Link, NodeEntity } from "../entities/Roadmap";


export interface IRoadMapRepository {

    getRoadmapById(id: mongoose.Types.ObjectId): Promise<Roadmap | null>;

    getAllRoadmaps(): Promise<Roadmap[]>;

    getAllPublishdRoadmaps(): Promise<Roadmap[]>;

    getAllRequestedRoadmaps(status: string): Promise<Roadmap[]>;

    getNodeDetailsByNodeId(nodeId: string): Promise<NodeDetails | null>;

    getRoadmapByTitle(title: string): Promise<Roadmap | null>;

    createRoadMap(roadMap: Roadmap): Promise<Roadmap>;

    updateRoadmap(id: mongoose.Types.ObjectId, adminFeedback: string, status: string): Promise<Roadmap | null>;

    addNodeToRoadmap(roadmapId: mongoose.Types.ObjectId, nodeId: mongoose.Types.ObjectId,): Promise<Roadmap | null>

    deleteRoadmap(id: string): Promise<boolean>;

    createNode(node: NodeEntity): Promise<NodeEntity>;

    saveRoadmap(
        roadmapId: mongoose.Types.ObjectId,
        nodes: NodeEntity[],
        edges: Edge[],
        nodeDetails: NodeDetails[]
    ): Promise<Roadmap | null>;

    updateRoadmapActiveStatus(id: string, isActive: boolean): Promise<Roadmap | null>;
}