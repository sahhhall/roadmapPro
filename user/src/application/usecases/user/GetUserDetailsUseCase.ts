

import { NotFoundError } from '@sahhhallroadmappro/common';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/interfaces/IUserRepositary';
import { IGetUserDetailsUseCase } from '../../interfaces/user/IGetUserDetailsUseCase';
import { IMentorRepository } from '../../../domain/interfaces/IMentorRepositary';


export class GetUserDetailsUseCase implements IGetUserDetailsUseCase {
    constructor(private userRepositary: IUserRepository, private mentorRepositary: IMentorRepository) { }
    async execute(userId: string): Promise<User | null | any> {
        const user = await this.userRepositary.getUserDetails(userId);
        if (!user) {
            throw new NotFoundError();
        }
        if (user.role == 'mentor') {
            let mentordata = await this.mentorRepositary.getMentorByid(userId)
            return mentordata
        }
        return user
    }
}