import { Roadmap } from "../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { IGetAllRoadMaps } from "../interfaces/IGetAllRoadMaps";

export class GetListedRoadMaps implements IGetAllRoadMaps {
    constructor(private readonly roadMapRepository: IRoadMapRepository) {}
    async execute(): Promise<Roadmap[] | null> {
        const roadmaps = await this.roadMapRepository.getAllPublishdRoadmaps(); 
        return roadmaps;
    }
}
