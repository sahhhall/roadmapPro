import { User } from "../../domain/entities/User";


export interface IUpdateAuthRole {
    execute(userId: string): Promise<User | null>;
}