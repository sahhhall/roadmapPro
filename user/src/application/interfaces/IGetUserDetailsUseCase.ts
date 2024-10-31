import { User } from "../../domain/entities/User";


export interface IGetUserDetailsUseCase {
    execute(userId: string): Promise<User | null>;
}