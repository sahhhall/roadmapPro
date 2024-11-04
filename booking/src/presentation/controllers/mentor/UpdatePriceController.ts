import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IPriceUpdateUseCase } from '../../../application/interfaces/mentor/IPriceUpdateUseCase';

export class UpdatePriceController {
    constructor(private readonly priceUpdateUseCase: IPriceUpdateUseCase) { }

    async updatePrice(req: Request, res: Response, next: NextFunction) {
        try {
            const { mentorId, pricePerSession } = req.body;
            const updatedPrice = await this.priceUpdateUseCase.execute({ mentorId, pricePerSession });
            return res.status(HttpStatus.OK).json(updatedPrice);
        } catch (error) {
            next(error);
        }
    }
}
