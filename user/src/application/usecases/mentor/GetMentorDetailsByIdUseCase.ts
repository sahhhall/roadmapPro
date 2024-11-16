import { Mentor } from "../../../domain/entities/User";
import { IMentorRepository } from "../../../domain/interfaces/IMentorRepositary";
import { s3Operation } from "../../../infrastructure/service/S3-client";
import { IGetMentorDetailsByIdUseCase } from "../../interfaces/mentor/IGetMentorDetailsByIdUseCase";



export class GetMentorDetailsByIdUseCase implements IGetMentorDetailsByIdUseCase {
    constructor(private mentorRepositary: IMentorRepository) { }
    async execute(mentorId: string): Promise<Mentor | null> {
        let mentor;
        mentor = await this.mentorRepositary.getMentorByid(mentorId);
        if (mentor?.userId?.avatar) {
            const avatarUrl = await s3Operation.getImageFromBucket(mentor.userId?.avatar as string);
            mentor = {
                ...mentor,
                userId: {
                    ...mentor.userId,
                    avatar: avatarUrl,
                },
            };
        }

        return mentor
    }
}