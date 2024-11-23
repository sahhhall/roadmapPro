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

    async partialUpdate(email: string, password: string): Promise<boolean> {
        const result = await Auth.updateOne({ email }, { $set: { password: password } }, { new: true })
        if (result.modifiedCount === 1) {
            return true
        } else {
            return false
        }
    }
    async update(user: any): Promise<void> {
        await Auth.findByIdAndUpdate(user.id, user);
    }

    async fetchUsers(page: number, pageSize: number): Promise<{ users: User[]; total: number; } | null> {
        const skip = (page - 1) * pageSize;
        const [users, total] = await Promise.all([
            Auth.find({ role: { $ne: 'admin' } })
                .skip(skip)
                .limit(pageSize)
                .sort({ createdAt: -1 }),
            Auth.countDocuments({ role: { $ne: 'admin' } })
        ]);

        return {
            users,
            total
        };
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

    async genericUpdate(userId: string, updateData: Partial<User>): Promise<User | null> {
        const updatedUser = await Auth.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
        return updatedUser;
    }
}