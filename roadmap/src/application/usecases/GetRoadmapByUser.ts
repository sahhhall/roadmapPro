import { Roadmap } from "../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { IGetMyRoadmapByUser } from "../interfaces/IGetMyRoadmapByUser";


export class GetMyRoadmapByUser implements IGetMyRoadmapByUser {
    constructor(private roadmapRepositary: IRoadMapRepository) { }
    async execute(userId: string, status: string): Promise<Roadmap[] | null> {
        const roadmaps = await this.roadmapRepositary.findAllRoadmapByStatus(userId, status);
        return roadmaps;
    }
}