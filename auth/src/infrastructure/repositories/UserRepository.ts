import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { Auth } from "../database";
import { Password } from "../../application/services/PasswordHash";



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

    async fetchUsers(): Promise<User[] | null> {
        return await Auth.find({ role: { $ne: 'admin' } })
    }

    async login(email: string, password: string): Promise<User | null> {
        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            const passwordMatches = await Password.compare(
                password,
                existingUser.password
            )
            if (passwordMatches) {
                return existingUser;
            }
            else {
                return null
            }
        } else {
            return null
        }
    }
}