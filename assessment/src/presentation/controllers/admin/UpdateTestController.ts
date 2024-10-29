import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IUpdateTestUseCase } from '../../../application/interfaces/admin/IUpdateTestUseCase';


export class UpdateTestController {
    constructor(private readonly updateTestUseCase: IUpdateTestUseCase) { };

    async updateTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { result, resultFeedback, id } = req.body;
            const updateTest = await this.updateTestUseCase.execute({ result, resultFeedback, id });
            return res.status(HttpStatus.CREATED).json(updateTest)
        } catch (error) {
            next(error)
        }
    }
}