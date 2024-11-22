import { Mentor } from "../../../domain/entities/User";

interface FilterOptions {
    expirience?: number;
    pricing?: {
        min?: number;
        max?: number;
    };
}
export interface IGetMentorsBySkillUseCase {
    execute(skill: string, userId?: string | undefined, search?: string | undefined, filters?: FilterOptions, page?: number, pageSize?: number): Promise<Mentor[] | null>;
}