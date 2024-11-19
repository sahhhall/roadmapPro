import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetMentorsBySkillUseCase } from '../../../application/interfaces/mentor/IGetMentorsBySkillUseCase';


export class GetMentorsBySkillController {
    constructor(private readonly getAllMentors: IGetMentorsBySkillUseCase) { };

    async getMentors(req: Request, res: Response, next: NextFunction) {
        try {
            let mentors;
            const { skill } = req.params;
            const { userId } = req.query;
            console.log("userId", userId)
            if (!userId) {
                mentors = await this.getAllMentors.execute(skill);
            } else {
                mentors = await this.getAllMentors.execute(skill, userId as any);
            }

            return res.status(HttpStatus.OK).json(mentors)
        } catch (error) {
            next(error)
        }
    }
}