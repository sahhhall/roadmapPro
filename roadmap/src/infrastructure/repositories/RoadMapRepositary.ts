import { RoadMap, Node, NodeDetails, Edge, User } from "../database/mongodb";
import {  IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { Roadmap, NodeDetails as NodeD } from "../../domain/entities/Roadmap";
import  { customLogger } from "../../presentation/middlewares/loggerMiddleware";


export class RoadMapRepository implements IRoadMapRepository {

    async createRoadMap(roadMapData: Roadmap): Promise<Roadmap> {
        try {
            const newRoadmap = RoadMap.build({
                userId: roadMapData.userId,
                title: roadMapData.title,
                description: roadMapData.description,
                status: roadMapData.status,
                nodes: roadMapData.nodes,
                edges: roadMapData.edges,
                adminFeedback: roadMapData.adminFeedback
            });
            await newRoadmap.save();
            return newRoadmap
        } catch (error: any) {
            customLogger.error(error.message)
            throw new Error(`db error,create${error.message}`);
        }
    }
    async getRoadmapById(id: string): Promise<Roadmap | null> {
        try {
            const roadmap = await RoadMap.findById(id).populate('nodes').populate('edges');
            return roadmap
        } catch (error: any) {
            throw new Error(`db error,get:${error.message}`);
        }
    }

    async getRoadmapByTitle(title: string): Promise<Roadmap | null> {
        try {
            console.log("hi");
            
            const roadmap = await RoadMap.findOne({ title });
            return roadmap;
        } catch (error: any) {
            console.error(`Error fetching roadmap by title: ${error.message}`);
            throw new Error(`db error,getbytitle:${error.message}`);
        }
    }

    async getAllRoadmaps(): Promise<Roadmap[]> {
        try {
            const roadmaps = await RoadMap.find();
            return roadmaps
        } catch (error: any) {
            throw new Error(`db error,get all:${error.message}`);
        }
    }
    async getNodeDetailsByNodeId(nodeId: string): Promise<NodeD | null> {
        try {
            const nodeDetails = await NodeDetails.findOne({ nodeId: nodeId });
            return nodeDetails;
        } catch (error) {
            console.error('Error fetching node details:', error);
            return null;
        }
    }
//have to change
    async updateRoadmap(id: string, updatedRoadmap: Partial<Roadmap>): Promise<Roadmap | null> {
        try {
            const roadmap = await RoadMap.findByIdAndUpdate(id, updatedRoadmap, { new: true }).exec();
            return roadmap ? roadmap.toObject() : null;
        } catch (error) {
            console.error(`Failed to update roadmap with ID: ${id}`, error);
            throw error;
        }
    }

    async deleteRoadmap(id: string): Promise<boolean> {
        try {
            const result = await RoadMap.findByIdAndDelete(id);
            return result != null;
        } catch (error: any) {
            console.error(`Failed to delete roadmap with ID: ${id}`, error);
            throw new Error(`db error,delete${error.message}`);
        }
    }
}