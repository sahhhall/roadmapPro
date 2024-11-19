import { Mentor } from "../../domain/entities/User";

export interface IMentorRepository {
    createMentorProfile(data: Pick<Mentor, 'userId' | 'expirience' | 'bio' | 'headline' | 'languages' | 'githubUrl' | 'linkedinUrl' | 'assessedSkills'>): Promise<Mentor | null>;
    getMentorsBySkill(skill: string, userId?: string | string): Promise<Mentor[] | null>;
    getMentorByid(mentorId: string): Promise<Mentor | null>;
    updateAdditionalInfo(mentorId: string, updatedData: Partial<Pick<Mentor, 'headline' | 'bio' | 'expirience'>>): Promise<Mentor>;
}
