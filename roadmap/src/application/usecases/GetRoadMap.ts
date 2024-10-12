import mongoose from "mongoose";
import { IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { IGetRoadMap } from "../interfaces/IGetRoadMap";
import { Roadmap } from "../../domain/entities/Roadmap";



export class GetRoadMap implements IGetRoadMap {
    constructor(private readonly roadMapRepository: IRoadMapRepository) { }

    async execute(roadmapId: mongoose.Types.ObjectId): Promise<Roadmap | null> {
        const roadmap = await this.roadMapRepository.getRoadmapById(roadmapId);
        return roadmap;
    }
}  