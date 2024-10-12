import { Roadmap, Node, Edge, NodeDetails, Link } from "../entities/Roadmap";


export interface IRoadMapRepository {
  
    getRoadmapById(id: string): Promise<Roadmap | null>;

    getAllRoadmaps(): Promise<Roadmap[]>;

    getNodeDetailsByNodeId(nodeId: string): Promise<NodeDetails | null>;

    getRoadmapByTitle(title: string): Promise<Roadmap | null>;

    createRoadMap (roadMap: Roadmap): Promise<Roadmap>;

    updateRoadmap(id: string, updatedRoadmap: Partial<Roadmap>): Promise<Roadmap | null>;
    
    deleteRoadmap(id: string): Promise<boolean>;
}