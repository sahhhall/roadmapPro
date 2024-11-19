import { NotFoundError } from "@sahhhallroadmappro/common";
import { Mentor } from "../../../domain/entities/User";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepositary";
import { s3Operation } from "../../../infrastructure/service/S3-client";
import { IGetMentorsBySkillUseCase } from "../../interfaces/mentor/IGetMentorsBySkillUseCase";



export class GetMentorsBySkillUseCase implements IGetMentorsBySkillUseCase {
    constructor(private mentorRepositary: IMentorRepository) { }
    async execute(skill: string): Promise<Mentor[] | null> {
        const mentors = await this.mentorRepositary.getMentorsBySkill(skill);
        if (!mentors) {
            throw new NotFoundError()
        }
        for (const mentor of mentors) {
            if (mentor) {
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