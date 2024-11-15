

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
        const user = await this.userRepositary.getUserDetails(userId);
        if (user?.avatar) {
            const avatarUrl = await s3Operation.getImageFromBucket(user?.avatar as string);
            userData = {
                user,
                avatar: avatarUrl
            }
        }
        if (!user) {
            throw new NotFoundError();
        }
        if (user.role == 'mentor') {
            let mentordata = await this.mentorRepositary.getMentorByid(userId) as any
            if (mentordata?.userId) {
                const avatarUrl = await s3Operation.getImageFromBucket(user?.avatar as string);
                mentordata = {
                    ...mentordata,
                    avatar: avatarUrl
                }
            }
            return mentordata
        }
        return userData
    }
}