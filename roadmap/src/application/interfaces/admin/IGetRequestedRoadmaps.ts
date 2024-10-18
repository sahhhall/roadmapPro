import { Roadmap } from "../../../domain/entities/Roadmap";


export interface IGetRequestedRoadmaps {
    execute(status: string): Promise<Roadmap[] | null>;
}
