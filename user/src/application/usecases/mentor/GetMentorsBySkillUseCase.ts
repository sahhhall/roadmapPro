import { NotFoundError } from "@sahhhallroadmappro/common";
import { Mentor } from "../../../domain/entities/User";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepositary";
import { s3Operation } from "../../../infrastructure/service/S3-client";
import { IGetMentorsBySkillUseCase } from "../../interfaces/mentor/IGetMentorsBySkillUseCase";

interface FilterOptions {
    expirience?: number;
    pricing?: {
        min?: number;
        max?: number;
    };
}

export class GetMentorsBySkillUseCase implements IGetMentorsBySkillUseCase {
    constructor(private mentorRepositary: IMentorRepository) { }
    async execute(skill: string, userId?: string | undefined, search?: string | undefined, filters?: FilterOptions, page?: number, pageSize?: number): Promise<Mentor[] | null> {
        const mentors = await this.mentorRepositary.getMentorsBySkill(skill, userId, search, filters, page, pageSize);
        if (!mentors) {
            throw new NotFoundError()
        }
        for (const mentor of mentors) {
            if (mentor && mentor.userId.avatar) {
                try {
                    const avatarUrl = await s3Operation.getImageFromBucket(mentor.userId.avatar);
                    mentor.userId.avatar = avatarUrl;
                } catch (error) {
                    console.error(`Error fetching avatar for mentor`, error);
                }
            }
        }
        return mentors
    }
}