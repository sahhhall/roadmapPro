import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { Auth } from "../database";



export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return await Auth.findOne({ email })
    }

    async create(user: User): Promise<any> {
        const newUser = Auth.build(user);
        return await newUser.save();
    }

    async findById(id: string): Promise<User | null> {
        return await Auth.findById(id);
    }
    async update(user: any): Promise<void> {
        await Auth.findByIdAndUpdate(user.id, user);
    }
}