import { RoadMap, Node, NodeDetails, Edge, User } from "../database/mongodb";
import { IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { Roadmap, NodeDetails as NodeD, NodeEntity, Edge as Edgee, } from "../../domain/entities/Roadmap";
import { customLogger } from "../../presentation/middlewares/loggerMiddleware";
import mongoose from "mongoose";


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
    async getRoadmapById(id: mongoose.Types.ObjectId): Promise<Roadmap | null> {
        try {
            const roadmap = await RoadMap.findById(id).populate('nodes').populate('edges');
            console.log("here roadmap", roadmap)
            return roadmap
        } catch (error: any) {
            customLogger.error(error.message)
            throw new Error(`db error,get:${error.message}`);
        }
    }

    async getRoadmapByTitle(title: string): Promise<Roadmap | null> {
        try {
            console.log("hi");

            const roadmap = await RoadMap.findOne({ title });
            return roadmap;
        } catch (error: any) {
            customLogger.error(`Error fetching roadmap by title: ${error.message}`);
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
            customLogger.error('Error fetching node details:', error);
            return null;
        }
    }
    async createNode(nodeData: NodeEntity): Promise<NodeEntity> {
        try {
            const newNode = Node.build({
                type: nodeData.type,
                position: {
                    x: nodeData.position.x,
                    y: nodeData.position.y
                },
                data: nodeData.data,
                background: nodeData.background
            });
            await newNode.save();
            return newNode;
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`db error, create node: ${error.message}`);
        }
    }

    //have to change
    async updateRoadmap(id: mongoose.Types.ObjectId, updatedRoadmap: Partial<Roadmap>): Promise<Roadmap | null> {
        try {
            const roadmap = await RoadMap.findByIdAndUpdate(id, updatedRoadmap, { new: true });
            return roadmap
        } catch (error) {
            customLogger.error(`Failed to update roadmap with ID: ${id}`, error);
            throw error;
        }
    }

    async addNodeToRoadmap(roadmapId: mongoose.Types.ObjectId, nodeId: mongoose.Types.ObjectId): Promise<Roadmap | null> {
        try {
            return await RoadMap.findByIdAndUpdate(roadmapId, { $push: { nodes: nodeId } });
        } catch (error: any) {
            customLogger.error(error.message)
            throw new Error(`db error,add node${error.message}`);
        }
    }

    async deleteRoadmap(id: string): Promise<boolean> {
        try {
            const result = await RoadMap.findByIdAndDelete(id);
            return result != null;
        } catch (error: any) {
            customLogger.error(`Failed to delete roadmap with ID: ${id}`, error);
            throw new Error(`db error,delete${error.message}`);
        }
    }

    // when pass diff operation this session i mean bind it trackk for us
    async saveRoadmap(
        roadmapId: mongoose.Types.ObjectId,
        nodes: NodeEntity[],
        edges: Edgee[],
        nodeDetails: NodeD[]
    ): Promise<Roadmap | null> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {

            const nodeUpserts = nodes.map((node) => ({
                updateOne: {
                    filter: { _id: node.id },
                    update: { $set: node },
                    upsert: true,
                },
            }));
            console.log(nodes, "node updates")

            const nodeDetailsUpserts = nodeDetails.map((detail) => ({
                updateOne: {
                    filter: { nodeId: detail.nodeId },
                    update: { $set: detail },
                    upsert: true,
                },
            }));
            console.log(nodeDetails, "node details");

            const newEdges = edges.map((edge) => ({
                source: edge.source,
                target: edge.target,
            }));

            // await Promise.all([
            //     Node.bulkWrite(nodeUpserts, { session }),
            //     NodeDetails.bulkWrite(nodeDetailsUpserts, { session }),
            //     Edge.bulkWrite(edgeUpserts, { session }),
            // ])
            await Node.bulkWrite(nodeUpserts, { session });
            await NodeDetails.bulkWrite(nodeDetailsUpserts, { session });
            const createdEdges = await Edge.insertMany(newEdges, { session });


            const updatedRoadmap = await RoadMap.findByIdAndUpdate(
                roadmapId,
                {
                    $set: {
                        nodes: nodes.map((node) => node.id),
                        edges: createdEdges.map((edge) => edge.id),
                    },
                },
                { new: true, session }
            );

            await session.commitTransaction();
            return updatedRoadmap;
        } catch (error: any) {
            await session.abortTransaction();
            customLogger.error(`Failed to save roadmap draft: ${error}`);
            throw new Error(`db error, save: ${error.message}`);
        } finally {
            session.endSession();
        }
    }


    async getAllPublishdRoadmaps() {
        try {
            const roadmaps = await RoadMap.find({
                status: { $nin: ['rejected', 'drafted'] }
            });
            return roadmaps;
        } catch (error: any) {
            throw new Error(`db error, get all: ${error.message}`);
        }
    }

    async getAllRequestedRoadmaps(status: string) {
        try {
            const roadmaps = await RoadMap.find({
                status
            });
            return roadmaps;
        } catch (error: any) {
            throw new Error(`db error, get all: ${error.message}`);
        }
    }

}