import { Mentor } from "../../domain/entities/User";

export interface IMentorRepository {
    createMentorProfile(data: Pick<Mentor, 'userId' | 'expirience' | 'bio' | 'headline' | 'languages' | 'githubUrl' | 'linkedinUrl' | 'assessedSkills'>): Promise<Mentor | null>;
}
