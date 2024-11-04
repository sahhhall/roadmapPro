import { User } from "../../domain/entities/User";


export interface IUserCreatedUseCase {
    execute(data: Pick<User, 'id' | 'role' | 'name' | 'email' | 'avatar'>): Promise<User | null>;
}