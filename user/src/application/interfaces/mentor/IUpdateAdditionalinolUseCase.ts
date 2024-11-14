import { Mentor } from "../../../domain/entities/User";

export interface IUpdateAdditionalInfoUseCase {
    execute(mentorId: string, updatedData: Partial<Pick<Mentor, 'headline' | 'bio' | 'expirience'>>): Promise<Mentor>;
}