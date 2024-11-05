import { Mentor } from "../../../domain/entities/User";


export interface IGetMentorDetailsByIdUseCase {
    execute(mentorId: string): Promise<Mentor | null>;
}