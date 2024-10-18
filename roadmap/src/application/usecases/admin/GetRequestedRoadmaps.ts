import { Roadmap } from "../../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../../domain/interfaces/IRoadMapRepositary";
import { IGetRequestedRoadmaps } from "../../interfaces/admin/IGetRequestedRoadmaps";



export class GetRequestedRoadmaps implements IGetRequestedRoadmaps {

    constructor(private readonly roadMapRepository: IRoadMapRepository) { };

    async execute(status: string): Promise<Roadmap[] | null> {
        console.log(status, "status from usecase");
        const roadmaps = await this.roadMapRepository.getAllRequestedRoadmaps(status);
        return roadmaps;
    }

}