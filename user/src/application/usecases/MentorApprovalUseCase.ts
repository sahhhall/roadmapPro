

import { IMentorRepository } from '../../domain/interfaces/IMentorRepositary'
import { Mentor } from '../../domain/entities/User';
import { IMentorApprovalUseCase } from '../interfaces/IMentorApprovalUseCase';


export class MentorApprovalUseCase implements IMentorApprovalUseCase {
    constructor(private mentorRepositary: IMentorRepository) { }
    async execute(data: Pick<Mentor, 'userId' | 'expirience' | 'bio' | 'headline' | 'languages' | 'githubUrl' | 'linkedinUrl' | 'assessedSkills'>): Promise<Mentor | null> {
        const approvedMentorData = await this.mentorRepositary.createMentorProfile(data);
        return approvedMentorData
    }
}