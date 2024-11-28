import { BadRequestError, NotFoundError } from "@sahhhallroadmappro/common";
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
        const mentors = await this.mentorRepositary.getMentorsBySkill(skill, userId, search, filters, page, pageSize) as any;
        if (!mentors) {
            throw new NotFoundError()
        }
        // the sake for more sercusred images it db stored just key now i have to fetch with help of key
        // so  it have to loop over all user and it shouldl only go through 5 steps beacuse paginayion is there

        await Promise.all(
            mentors.map(async (mentor: any) => {
                if (mentor && mentor.userProfile[0]?.avatar) {
                    try {
                        const avatarUrl = await s3Operation.getImageFromBucket(mentor.userProfile[0].avatar);
                        mentor.userProfile[0].avatar = avatarUrl;
                    } catch (error) {
                        throw new BadRequestError('try again later haha')
                    }
                }
            })
        );
        return mentors
    }
}