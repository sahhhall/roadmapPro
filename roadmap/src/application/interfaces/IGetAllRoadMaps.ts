import { Roadmap } from "../../domain/entities/Roadmap";

export interface IGetAllRoadMaps {
    execute(): Promise<Roadmap[] | null>;
}
