import { Mentor } from "../../../domain/entities/User";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepositary";
import { IGetMentorDetailsByIdUseCase } from "../../interfaces/mentor/IGetMentorDetailsByIdUseCase";



export class GetMentorDetailsByIdUseCase implements IGetMentorDetailsByIdUseCase {
    constructor(private mentorRepositary: IMentorRepository) { }
    async execute(mentorId: string): Promise<Mentor | null> {
        const mentor = await this.mentorRepositary.getMentorByid(mentorId);
        return mentor
    }
}