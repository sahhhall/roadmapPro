import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '@sahhhallroadmappro/common'; // Assuming custom error classes
import { IAdminReview } from '../../../application/interfaces/admin/IAdminReview';

export class RoadMapReviewController {
    constructor(private adminReviewUseCase: IAdminReview) { }

    async reviewRoadmap(req: Request, res: Response, next: NextFunction) {
        try {
            const { adminFeedback, status, roadmapId } = req.body;
            const reviewedRoadmap = await this.adminReviewUseCase.execute({
                adminFeedback,
                status,
                roadmapId,
            });

            if (!reviewedRoadmap) {
                throw new NotFoundError()
            }
            res.status(200).json(reviewedRoadmap);
        } catch (error) {
            next(error); 
        }
    }
}
