import { User } from "../../domain/entities/User";
import { Profile } from "../database/mongodb/schemas/user.schema";
import { IUserRepository } from "../../domain/interfaces/IUserRepositary";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";

export class UserRepository implements IUserRepository {
    async create({
        userId, email, name, isGoogle
    }: { userId: string, email: string, name: string, isGoogle: boolean }): Promise<User> {
        try {
            const newUser = Profile.build({
                _id: userId,
                email,
                name,
                isGoogle,
            });
            return await newUser.save();
        } catch (error: any) {
            customLogger.error(`db error: ${error.message}`);
            throw new Error(`db error: ${error.message}`);
        }
    }

    async updateUserProfile(userId: string): Promise<User | null> {
        try {
            const updatedProfile = await Profile.findOneAndUpdate(
                { _id: userId },
                { role: 'mentor' },
                { new: true }
            );
            return updatedProfile;
        } catch (error: any) {
            customLogger.error(`db error: ${error.message}`);
            throw new Error(`db error: ${error.message}`);
        }
    }
    async getUserDetails(userId: string): Promise<User | null> {
        try {
            const userDetails = await Profile.findById(userId).lean();
            return userDetails;
        } catch (error: any) {
            customLogger.error(`db error to fetch user ${userId}: ${error.message}`);
            throw new Error(`db error to fetch user: ${error.message}`);
        }
    }

    async updateUserProfileData(userId: string, data: { name?: string; avatar?: string }): Promise<User | null> {
        try {
            const updatedUser = await Profile.findByIdAndUpdate(
                userId,
                { $set: data },
                { new: true }
            );
            return updatedUser as User | null;
        } catch (error: any) {
            customLogger.error(`db error to update user ${userId}: ${error.message}`);
            throw new Error(`db error to update user: ${error.message}`);
        }
    }
}

