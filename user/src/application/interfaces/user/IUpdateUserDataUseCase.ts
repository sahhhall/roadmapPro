import { User } from "../../../domain/entities/User";

export interface IUpdateUserDataUseCase {
    execute(userId: string, data: { name?: string, avatar?: string }): Promise<User | null>;
}