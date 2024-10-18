import { Roadmap } from "../../../domain/entities/Roadmap";


export interface IGetRequestedRoadmaps {
    execute(): Promise<Roadmap[] | null>;
}
