import { Mentor } from "../../domain/entities/User";
interface FilterOptions {
    expirience?: number;
    pricing?: {
        min?: number;
        max?: number;
    };
}

export interface IMentorRepository {
    createMentorProfile(data: Pick<Mentor, 'userId' | 'expirience' | 'bio' | 'headline' | 'languages' | 'githubUrl' | 'linkedinUrl' | 'assessedSkills'>): Promise<Mentor | null>;
    getMentorsBySkill(skill: string, userId?: string | string, search?: string | undefined, filters?: FilterOptions, page?: number, pageSize?: number): Promise<Mentor[] | null>;
    getMentorByid(mentorId: string): Promise<Mentor | null>;
    updateAdditionalInfo(mentorId: string, updatedData: Partial<Pick<Mentor, 'headline' | 'bio' | 'expirience'>>): Promise<Mentor>;
}
