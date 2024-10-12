import mongoose from "mongoose";
import { NodeEntity } from "../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { ICreateNodeUseCase } from "../interfaces/ICreateNodeUseCase";

export class CreateNodeUseCase implements ICreateNodeUseCase {
    constructor(private roadMapRepository: IRoadMapRepository) { }

    async execute(
        nodeData: {
            data: string,
            position: any,
            type: string,
            roadmapId: mongoose.Types.ObjectId
        }
    ): Promise<NodeEntity | null> {
        const { type, position, data, roadmapId } = nodeData;
        const existingRoadmap = await this.roadMapRepository.getRoadmapById(roadmapId);
        if (!existingRoadmap) {
            throw new Error('Roadmap not found');
        }

        const newNode = new NodeEntity(
            type,
            position,
            data
        )

        const savedNode = await this.roadMapRepository.createNode(newNode) as NodeEntity;
        if (!savedNode.id) {
            return null
        }
        await this.roadMapRepository.addNodeToRoadmap(roadmapId, savedNode!.id);

        return savedNode;
    }
}
