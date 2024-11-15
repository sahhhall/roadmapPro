import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetBookingsCountAndUserUseCase } from '../../../application/interfaces/admin/IGetBookingsCountAndUserUseCase';

export class GetBookingsCountAndUser {
    constructor(private readonly getAnalytics: IGetBookingsCountAndUserUseCase) { }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.getAnalytics.execute();
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            next(error);
        }
    }
}
