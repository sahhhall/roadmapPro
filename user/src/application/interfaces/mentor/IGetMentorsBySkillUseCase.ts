import { Mentor } from "../../../domain/entities/User";


export interface IGetMentorsBySkillUseCase {
    execute(skill: string, userId?: string | undefined): Promise<Mentor[] | null>;
}