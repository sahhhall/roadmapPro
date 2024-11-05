import { Mentor } from "../../domain/entities/User";
import { MentorAttr, Mentor as MentorDB } from "../database/mongodb/schemas/mentor.schma";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import mongoose, { Mongoose } from "mongoose";
import { IMentorRepository } from "../../domain/interfaces/IMentorRepositary";



export class MentorRepositary implements IMentorRepository {
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

    async getMentorsBySkill(skill: string): Promise<Mentor[] | null> {
        try {
            return await MentorDB.find({
                assessedSkills: {
                    $regex: new RegExp(`^${skill}$`, 'i')
                }
            }).populate({
                path: 'userId',
                select: 'name email avatar '
            })
                .select('-updatedAt -totalEarnings');
        } catch (error: any) {
            customLogger.error(`db error to fetch mentros by ${skill}: ${error.message}`);
            throw new Error(`db error to fetch mentros by ${skill}: ${error.message}`);
        }
    }

    async getMentorByid(mentorId: string): Promise<Mentor | null> {
        try {
            return await MentorDB.findOne({ userId: mentorId }).populate({
                path: 'userId',
                select: 'name email avatar '
            })
        } catch (error: any) {
            customLogger.error(`db error to fetch mentr by ${mentorId}: ${error.message}`);
            throw new Error(`db error to fetch mentr by ${mentorId}: ${error.message}`);
        }
    }
}