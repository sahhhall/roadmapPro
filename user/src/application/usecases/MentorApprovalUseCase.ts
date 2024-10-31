

import { IMentorRepository } from '../../domain/interfaces/IMentorRepositary'
import { Mentor } from '../../domain/entities/User';
import { IMentorApprovalUseCase } from '../interfaces/IMentorApprovalUseCase';
import { IUserRepository } from '../../domain/interfaces/IUserRepositary';


export class MentorApprovalUseCase implements IMentorApprovalUseCase {
    constructor(private mentorRepositary: IMentorRepository, private userRepositary: IUserRepository) { }
    async execute(data: Pick<Mentor, 'userId' | 'expirience' | 'bio' | 'headline' | 'languages' | 'githubUrl' | 'linkedinUrl' | 'assessedSkills'>): Promise<Mentor | null> {
        const approvedMentorData = await this.mentorRepositary.createMentorProfile(data);
        //this for change user profile role type to user => mentor 
        await this.userRepositary.updateUserProfile(data.userId)
        return approvedMentorData
    }
}