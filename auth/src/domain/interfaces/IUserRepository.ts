import { User } from "../entities/User";

export interface IUserRepository {
    // findByEmail(email: string): Promise<User | null>;
    // findById(): Promise<User | null>
    // create(user: User): Promise<User>;
    login(email: User["email"], password: User["password"]): Promise<User | null>;
    // forgotPassword(email: User["email"]): Promise<Boolean>;
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    update(user: User): Promise<void>;
    fetchUsers(page: number, pageSize: number):  Promise<{users: User[];total: number;} | null>;
    partialUpdate(email: string, password: string): Promise<boolean>
    genericUpdate(userId: string, updateData: Partial<User>): Promise<User | null>
}