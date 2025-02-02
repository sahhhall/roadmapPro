import { User } from "../../domain/entities/User";

export interface IUserRepository {
    create(data: {
        id: string;
        role: string;
        name: string;
        email: string;
        avatar?: string;
    }): Promise<User | null>;

    getUser(id: string): Promise<User | null>;
    getCount(): Promise<number | null>
}