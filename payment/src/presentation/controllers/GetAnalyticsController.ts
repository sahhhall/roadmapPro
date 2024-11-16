import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetTotalRevenueUseCase } from '../../application/interfaces/IGetTotalRevenueUseCase';

export class GetAnalyticsController {
    constructor(private getTotalRevenueUseCase: IGetTotalRevenueUseCase) { }
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const total = await this.getTotalRevenueUseCase.execute()
            res.status(HttpStatus.OK).json(total);
        } catch (error) {
            console.error("Error in PaymentController:", error);
            next(error);
        }
    }
}
