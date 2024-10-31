

import { NotFoundError } from '@sahhhallroadmappro/common';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/interfaces/IUserRepositary';
import { IGetUserDetailsUseCase } from '../../interfaces/user/IGetUserDetailsUseCase';


export class GetUserDetailsUseCase implements IGetUserDetailsUseCase {
    constructor(private userRepositary: IUserRepository) { }
    async execute(userId: string): Promise<User | null> {
        const user = await this.userRepositary.getUserDetails(userId);
        if (!user) {
            throw new NotFoundError();
        }
        return user
    }
}