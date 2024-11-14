import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IUpdateAdditionalInfoUseCase } from '../../../application/interfaces/mentor/IUpdateAdditionalinolUseCase';


export class updateAdditionalinfoController {
    constructor(private readonly updateData: IUpdateAdditionalInfoUseCase) { };

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { mentorId, updatedData } = req.body;
            const updatedProfile = await this.updateData.execute(mentorId, updatedData)
            return res.status(HttpStatus.ACCEPTED).json(updatedProfile)
        } catch (error) {
            next(error)
        }
    }
}