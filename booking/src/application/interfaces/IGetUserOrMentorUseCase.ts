import { User } from "../../domain/entities/User";


export interface IGetUserOrMentorUseCase {
    execute(userId: string): Promise<User | null>;
}
