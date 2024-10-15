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
            background: string,
            roadmapId: mongoose.Types.ObjectId
        }
    ): Promise<NodeEntity | null> {
        const { type, position, data, background, roadmapId } = nodeData;
        const existingRoadmap = await this.roadMapRepository.getRoadmapById(roadmapId);
        if (!existingRoadmap) {
            return null;
        }

        const newNode = new NodeEntity(
            type,
            position,
            data,
            background
        )

        const savedNode = await this.roadMapRepository.createNode(newNode) as NodeEntity;
        if (!savedNode.id) {
            return null
        }
        await this.roadMapRepository.addNodeToRoadmap(roadmapId, savedNode!.id);

        return savedNode;
    }
}
