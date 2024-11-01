import mongoose from "mongoose";
import { Roadmap } from "../../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../../domain/interfaces/IRoadMapRepositary";
import { IStatusChangeUseCase } from "../../interfaces/admin/IStatusChangeUseCase";
import { NotFoundError } from "@sahhhallroadmappro/common";



export class StatusChangeUseCase implements IStatusChangeUseCase {

    constructor(private readonly roadMapRepository: IRoadMapRepository) { };

    async execute(roadmapId: string): Promise<Roadmap | null> {
        const objectId = new mongoose.Types.ObjectId(roadmapId)
        const roadmap = await this.roadMapRepository.getRoadmapById(objectId);
        if (!roadmap) {
            throw new NotFoundError();
        }
        const updatedRoadmap = await this.roadMapRepository.updateRoadmapActiveStatus(roadmap.id as string, roadmap!.isActive as boolean);
        return updatedRoadmap
    }

}