import { Mentor } from "../../domain/entities/User";
import { MentorAttr, Mentor as MentorDB } from "../database/mongodb/schemas/mentor.schma";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import mongoose, { Mongoose } from "mongoose";



export class MentorRepositary {
    async createMentorProfile(data: MentorAttr): Promise<Mentor | null> {
        try {
            const newMentor = MentorDB.build({
                userId: data.userId,
                expirience: data.expirience,
                bio: data.bio,
                headline: data.headline,
                languages: data.languages,
                githubUrl: data.githubUrl,
                linkedinUrl: data.linkedinUrl,
                assessedSkills: data.assessedSkills
            });
             await newMentor.save();
             return newMentor
        } catch (error: any) {
            customLogger.error(`db error to save mentor: ${error.message}`);
            throw new Error(`db error to save mentro: ${error.message}`);
        }
    }
}