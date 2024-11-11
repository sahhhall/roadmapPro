import { Roadmap } from "../../domain/entities/Roadmap";


//here userId or mentorId
export interface IGetMyRoadmapByUser {
    execute(userId: string, status: string | undefined): Promise<Roadmap[] | null>
}