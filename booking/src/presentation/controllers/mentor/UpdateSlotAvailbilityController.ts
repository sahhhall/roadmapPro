import { Request, Response, NextFunction } from 'express';
import { BadRequestError, HttpStatus } from '@sahhhallroadmappro/common';
import { IAvailibilityUpdateUseCase } from '../../../application/interfaces/mentor/IAvailibilityUpdateUseCase';


export class UpdateSlotAvailbilityController {
    constructor(private readonly availbilitySlotUpdateUseCase: IAvailibilityUpdateUseCase) { };

    async updateSlot(req: Request, res: Response, next: NextFunction) {
        try {
            const { mentorId, weeklySchedule } = req.body;
            // if (mentorId != req.user?.id) {
            //     throw new BadRequestError('go and change your slot');
            // }
            const slotAvailbilityUpdation = await this.availbilitySlotUpdateUseCase.execute({ mentorId, weeklySchedule });
            return res.status(HttpStatus.CREATED).json(slotAvailbilityUpdation)
        } catch (error) {
            next(error)
        }
    }
}