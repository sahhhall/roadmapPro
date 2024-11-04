import { IUserCreatedUseCase } from '../interfaces/IUserCreatedUseCase';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/interfaces/IUserRepositary';


export class UserCreatedUseCase implements IUserCreatedUseCase {
    constructor(private userRepositary: IUserRepository) { }
    async execute(data: Pick<User, 'id' | 'role' | 'name' | 'email' | 'avatar'>): Promise<User | null> {
        const createdUserData = await this.userRepositary.create(data);
        return createdUserData;
    }
}