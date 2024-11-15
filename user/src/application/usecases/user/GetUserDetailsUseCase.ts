

import { NotFoundError } from '@sahhhallroadmappro/common';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/interfaces/IUserRepositary';
import { IGetUserDetailsUseCase } from '../../interfaces/user/IGetUserDetailsUseCase';
import { IMentorRepository } from '../../../domain/interfaces/IMentorRepositary';
import { s3Operation } from '../../../infrastructure/service/S3-client';


export class GetUserDetailsUseCase implements IGetUserDetailsUseCase {
    constructor(private userRepositary: IUserRepository, private mentorRepositary: IMentorRepository) { }
    async execute(userId: string): Promise<User | null | any> {
        let userData;
        userData = await this.userRepositary.getUserDetails(userId);
        if (userData?.avatar) {
            const avatarUrl = await s3Operation.getImageFromBucket(userData?.avatar as string);
            userData = {
                ...userData,
                avatar: avatarUrl
            }
        }
        if (!userData) {
            throw new NotFoundError();
        }
        if (userData.role == 'mentor') {
            let mentordata = await this.mentorRepositary.getMentorByid(userId) as any
            if (mentordata?.userId?.avatar) {
                const avatarUrl = await s3Operation.getImageFromBucket(mentordata.userId?.avatar as string);
                mentordata = {
                    ...mentordata,
                    userId: {
                        ...mentordata.userId,
                        avatar: avatarUrl,
                    },
                };
            }
            return mentordata
        }
        return userData
    }
}