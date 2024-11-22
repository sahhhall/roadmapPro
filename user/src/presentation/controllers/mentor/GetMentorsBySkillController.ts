import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetMentorsBySkillUseCase } from '../../../application/interfaces/mentor/IGetMentorsBySkillUseCase';

interface FilterOptions {
    expirience?: number;
    pricing?: {
        min?: number;
        max?: number;
    };
    languages?: string[]
    companies?: string[]
}

export class GetMentorsBySkillController {
    constructor(private readonly getAllMentors: IGetMentorsBySkillUseCase) { };

    async getMentors(req: Request, res: Response, next: NextFunction) {
        try {
            let mentors;
            const { skill } = req.params;
            const { userId, search, expirience, languages, companies, page = 1, pageSize = 10 } = req.query;

            //this will pass into use case and perfom
            const filters: FilterOptions = {}
            if (expirience) filters.expirience = parseInt(expirience as string);
            if (languages) {
                //first need to construct languages to array to check
                //because it in url like languages=hindi,malayalam
                //so it have to convert to array to db operation
                filters.languages = languages.toString().split(',')
            }
            if (companies) {
                filters.companies = companies.toString().split(',')
            }

            //the need of this
            //Two users will fetch mentor Data
            // 1- Authorized users 2- users who not logged in or signup 
            // so for unauthorized users need to fetch all data
            // for authorized mentors/users we have to exclude the  their profile
            if (!userId) {
                mentors = await this.getAllMentors.execute(skill, undefined, search as string, filters, page as number, pageSize as number);
            } else {
                mentors = await this.getAllMentors.execute(skill, userId as any, search as string, filters, page as number, pageSize as number);
            }

            return res.status(HttpStatus.OK).json(mentors)
        } catch (error) {
            next(error)
        }
    }
}