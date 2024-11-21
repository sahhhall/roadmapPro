
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/interfaces/IUserRepositary';
import { IGetUserOrMentorUseCase } from '../interfaces/IGetUserOrMentorUseCase';


export class GetUserOrMentorUseCase implements IGetUserOrMentorUseCase {
    constructor(private userRepositary: IUserRepository) { }
    async execute(userId: string): Promise<User | null> {
        //this for getting user or mentor details (can user kafka producer for notification)
        const user = await this.userRepositary.getUser(userId);
        return user;
    }
}