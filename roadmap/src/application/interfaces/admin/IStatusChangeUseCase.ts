
import { Roadmap } from "../../../domain/entities/Roadmap";


export interface IStatusChangeUseCase {
    execute(roadmapId: string): Promise<Roadmap | null>;
}