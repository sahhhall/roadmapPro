import { Request, Response, NextFunction } from 'express';
import { BadRequestError, HttpStatus } from '@sahhhallroadmappro/common';
import { IPriceUpdateUseCase } from '../../../application/interfaces/mentor/IPriceUpdateUseCase';

export class UpdatePriceController {
    constructor(private readonly priceUpdateUseCase: IPriceUpdateUseCase) { }

    async updatePrice(req: Request, res: Response, next: NextFunction) {
        try {
            const { mentorId, pricePerSession } = req.body;
            // if (mentorId != req.user?.id) {
            //     throw new BadRequestError('go and change your slot');
            // }
            const updatedPrice = await this.priceUpdateUseCase.execute({ mentorId, pricePerSession });
            return res.status(HttpStatus.OK).json(updatedPrice);
        } catch (error) {
            next(error);
        }
    }
}
