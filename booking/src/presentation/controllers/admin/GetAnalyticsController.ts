import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetAnalyticsUseCase } from '../../../application/interfaces/admin/IGetAnalyticsUseCase';

export class GetAnalyticsController {
    constructor(private readonly getAnalytics: IGetAnalyticsUseCase) { }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { days } = req.query;
            console.log(days,"da");
            
            const result = await this.getAnalytics.execute(days as string);
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
}
