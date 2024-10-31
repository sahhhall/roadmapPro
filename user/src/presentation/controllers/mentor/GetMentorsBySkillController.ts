import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetMentorsBySkillUseCase } from '../../../application/interfaces/mentor/IGetMentorsBySkillUseCase';


export class GetMentorsBySkillController {
    constructor(private readonly getAllMentors: IGetMentorsBySkillUseCase) { };

    async getMentors(req: Request, res: Response, next: NextFunction) {
        try {
            const { skill } = req.params;
            const mentors = await this.getAllMentors.execute(skill);
            return res.status(HttpStatus.OK).json(mentors)
        } catch (error) {
            next(error)
        }
    }
}