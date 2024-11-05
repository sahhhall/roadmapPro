import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetMentorDetailsByIdUseCase } from '../../../application/interfaces/mentor/IGetMentorDetailsByIdUseCase';


export class GetMentorAllDetailsController {
    constructor(private readonly getMentorDetails: IGetMentorDetailsByIdUseCase) { };

    async mentorDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { mentorId } = req.params;
            const mentors = await this.getMentorDetails.execute(mentorId);
            return res.status(HttpStatus.OK).json(mentors)
        } catch (error) {
            next(error)
        }
    }
}