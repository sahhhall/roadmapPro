import { Mentor } from "../../domain/entities/User";
import { MentorAttr, Mentor as MentorDB } from "../database/mongodb/schemas/mentor.schma";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { IMentorRepository } from "../../domain/interfaces/IMentorRepositary";
import mongoose from "mongoose";

interface FilterOptions {
    expirience?: number;
    pricing?: {
        min?: number;
        max?: number;
    };
    languages?: string[]
    companies?: string[]
}


export class MentorRepositary implements IMentorRepository {
    async createMentorProfile(data: MentorAttr): Promise<Mentor | null> {
        try {
            const newMentor = MentorDB.build({
                userId: data.userId,
                expirience: Number(data.expirience),
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

    async getMentorsBySkill(skill: string, userId?: string, search?: string | undefined, filters?: FilterOptions, page?: number, pageSize?: number): Promise<Mentor[] | null> {
        try {

            // it for base pipleing all find 
            // have assessd skill beacuase we finding based on assess skill
            // in frontend listing like based on skills
            const basepipline: any = {
                $and: [
                    { assessedSkills: { $regex: `^${skill}$`, $options: 'i' } },

                ]
            }

            //if user id pro
            if (userId) {
                basepipline['$and'].push({ userId: { $ne: new mongoose.Types.ObjectId(userId) } });
            }
            if (filters) {
                if (filters.expirience) {
                    basepipline['$and'].push({ expirience: { $gte: filters.expirience } });
                }
                //it need but actually here not updating only booking service updating the session price
                // i have to sent a event to here update so it later ddo
                // if (filters.pricing?.min) {
                //     basepipline['$and'].push({ $gte: filters.pricing.min });
                // }
                //adding a query to find lanuges base mentor
                if (filters.languages) {
                    basepipline['$and'].push({ languages: { $all: filters.languages } })
                }
                // companie based mentors it just for dummy if they add any company into headline  that will get I
                if (filters.companies) {
                    basepipline['$and'].push({ headline: { $in: filters.companies.map(company => new RegExp(company, 'i')) } })
                }
            }
            console.log(basepipline, "base")

            const aggregationPipeline = [
                {
                    $match: basepipline,

                },
                {
                    $lookup: {
                        from: 'profiles',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userProfile'
                    }
                },

            ];

            if (search) {
                const searchRegex = new RegExp(search, 'i');
                aggregationPipeline.splice(3, 0, {
                    $match: {
                        $or: [
                            { 'userProfile.name': { $regex: searchRegex } },
                            { 'userProfile.email': { $regex: searchRegex } },
                        ]
                    }
                });
            }



            //pagination
            let skip;
            if (page && pageSize) {
                skip = (page - 1) * pageSize;
            }
            console.log(page, pageSize, "pagw pagw size")



            const results = await MentorDB.aggregate(aggregationPipeline).skip(skip as number).limit(pageSize as number);
            return results || null;
        } catch (error: any) {
            console.error('Full error:', error);
            throw new Error(`db error to fetch mentors by ${skill}: ${error.message}`);
        }
    }
    async getMentorByid(mentorId: string): Promise<Mentor | null> {
        try {
            return await MentorDB.findOne({ userId: mentorId }).populate({
                path: 'userId',
                select: 'name email avatar '
            }).lean()
        } catch (error: any) {
            customLogger.error(`db error to fetch mentr by ${mentorId}: ${error.message}`);
            throw new Error(`db error to fetch mentr by ${mentorId}: ${error.message}`);
        }
    }

    async updateAdditionalInfo(mentorId: string, updatedData: Partial<Pick<Mentor, 'headline' | 'bio' | 'expirience'>>): Promise<Mentor | any> {
        try {
            const updatedMentor = await MentorDB.findOneAndUpdate(
                { userId: mentorId },
                { $set: updatedData },
                { new: true }
            );
            return updatedMentor;
        } catch (error: any) {
            customLogger.error(`db error to fetch mentr by ${mentorId}: ${error.message}`);
            throw new Error(`db error to fetch mentr by ${mentorId}: ${error.message}`);
        }
    }
}