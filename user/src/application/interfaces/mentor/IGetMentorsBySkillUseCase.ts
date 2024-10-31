import { Mentor } from "../../../domain/entities/User";


export interface IGetMentorsBySkillUseCase {
    execute(skill: string): Promise<Mentor[] | null>;
}