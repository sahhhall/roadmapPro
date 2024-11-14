import { NotFoundError } from "@sahhhallroadmappro/common";
import { Mentor } from "../../../domain/entities/User";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepositary";
import { IUpdateAdditionalInfoUseCase } from "../../interfaces/mentor/IUpdateAdditionalinolUseCase";

export class UpdateAdditionalInfoUseCase implements IUpdateAdditionalInfoUseCase {
    constructor(private readonly mentorRepository: IMentorRepository) { }

    async execute(mentorId: string, updatedData: Partial<Pick<Mentor, 'headline' | 'bio' | 'expirience'>>): Promise<Mentor> {

        const existingMentor = await this.mentorRepository.getMentorByid(mentorId);
        if (!existingMentor) {
            throw new NotFoundError();
        }

        const updatedMentor = await this.mentorRepository.updateAdditionalInfo(
            mentorId,
            updatedData
        );

        return updatedMentor;
    }
}