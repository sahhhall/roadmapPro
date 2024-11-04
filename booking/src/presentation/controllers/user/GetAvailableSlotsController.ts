import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetAvailableSlotsUseCase } from '../../../application/interfaces/user/IGetAvailableSlotsUseCase';

export class GetAvailableSlotsController {
    constructor(private readonly getAvailableSlotsUseCase: IGetAvailableSlotsUseCase) {}

    async getSlots(req: Request, res: Response, next: NextFunction) {
        try {
            const { mentorId } = req.params; 
            const availability = await this.getAvailableSlotsUseCase.execute(mentorId);
            return res.status(HttpStatus.OK).json(availability);
        } catch (error) {
            next(error);
        }
    }
}
