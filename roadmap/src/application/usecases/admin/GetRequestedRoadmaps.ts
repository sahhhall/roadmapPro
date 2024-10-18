import { Roadmap } from "../../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../../domain/interfaces/IRoadMapRepositary";
import { IGetRequestedRoadmaps } from "../../interfaces/admin/IGetRequestedRoadmaps";



export class GetRequestedRoadmaps implements IGetRequestedRoadmaps {

    constructor(private readonly roadMapRepository: IRoadMapRepository) { };

    async execute(): Promise<Roadmap[] | null> {
        const roadmaps = await this.roadMapRepository.getAllDraftedRoadmaps();
        return roadmaps;
    }

}