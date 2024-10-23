import { Request, Response, NextFunction } from 'express';
import { ICreateStackUseCase } from '../../../application/interfaces/admin/ICreateStackUseCase';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { ICreateTestUseCase } from '../../../application/interfaces/user/ITestCreateUseCase';
import { IEvaluateTestUseCase } from '../../../application/interfaces/user/IEvaluateTestUseCase';


export class EvaluateTestController {
    constructor(private readonly evaluateTestUseCase: IEvaluateTestUseCase) { };

    async valuateTest(req: Request, res: Response, next: NextFunction) {
        try {
            //we get data when user submit so we have to validate with testid so id for that
            // and questionn is user submitted array in that user ansewer is there
            //so for valuate pass it use case in there db operation will goin on for validation
            const { questions, id } = req.body;

            const result = await this.evaluateTestUseCase.execute({ questions, id });
            return res.status(HttpStatus.CREATED).json(result)
        } catch (error) {
            next(error)
        }
    }
}