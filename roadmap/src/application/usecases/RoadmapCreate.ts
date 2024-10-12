import { Roadmap } from "../../domain/entities/Roadmap";
import { IRoadMapRepository } from "../../domain/interfaces/IRoadMapRepositary";
import { IRoadMapCreate } from "../interfaces/IRoadmapCreate";



export class RoadMapCreate implements IRoadMapCreate {
    constructor(private roadMapRepository: IRoadMapRepository,
    ) { }

    async execute({
        userId,
        title,
        description,
    }: Pick<Roadmap, 'userId' | 'title' | 'description'>): Promise<Roadmap | null> {
        const existingRoadmap = await this.roadMapRepository.getRoadmapByTitle(title);
        if (existingRoadmap) {
            return null;
        }
        const newRoadmap = new Roadmap(
            userId,
            title,
            description,
        );

        const savedRoadmap = await this.roadMapRepository.createRoadMap(newRoadmap);

        return savedRoadmap;
    }
}
