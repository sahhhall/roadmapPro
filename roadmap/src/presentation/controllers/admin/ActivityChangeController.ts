import { NextFunction, Request, Response } from 'express';
import { BadRequestError, HttpStatus, NotFoundError } from '@sahhhallroadmappro/common'; // Assuming custom error classes
import { IAdminReview } from '../../../application/interfaces/admin/IAdminReview';
import mongoose from 'mongoose';
import { IStatusChangeUseCase } from '../../../application/interfaces/admin/IStatusChangeUseCase';

export class ActivityChangeController {
    constructor(private statusChange: IStatusChangeUseCase) { }

    async changeActive(req: Request, res: Response, next: NextFunction) {
        try {
            const { roadmapId } = req.body;
            console.log(roadmapId,"roadmapid")
            const updatedRoamdap = await this.statusChange.execute(roadmapId);
            return res.status(HttpStatus.OK).json(updatedRoamdap);
        } catch (error) {
            next(error); 
        }
    }
}
