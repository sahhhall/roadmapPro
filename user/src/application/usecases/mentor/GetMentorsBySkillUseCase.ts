import { Mentor } from "../../../domain/entities/User";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepositary";
import { IGetMentorsBySkillUseCase } from "../../interfaces/mentor/IGetMentorsBySkillUseCase";



export class GetMentorsBySkillUseCase  implements IGetMentorsBySkillUseCase {
    constructor(private mentorRepositary: IMentorRepository) { }
    async execute(skill: string): Promise<Mentor[] | null> {
        const mentors = await this.mentorRepositary.getMentorsBySkill(skill);
        return mentors
    }
}