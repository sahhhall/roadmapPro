
import { Roadmap } from "../../domain/entities/Roadmap";

export interface IRoadMapCreate {
    execute(data: Pick<Roadmap, 'userId' | 'title' | 'description' >): Promise<Roadmap| null>;
}