import { Request, Response, NextFunction } from 'express';
import { ICreateStackUseCase } from '../../../application/interfaces/admin/ICreateStackUseCase';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { ICreateTestUseCase } from '../../../application/interfaces/user/ITestCreateUseCase';


export class InitialTestController {
    constructor(private readonly createTestUseCase: ICreateTestUseCase) { };

    async createStack(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user!.id;
            const { stackId, expirience, headline, bio, linkedinUrl, githubUrl, languages } = req.body;
            const initialTest = await this.createTestUseCase.execute({ userId, stackId, expirience, headline, bio, linkedinUrl, githubUrl, languages });
            return res.status(HttpStatus.CREATED).json(initialTest)
        } catch (error) {
            next(error)
        }
    }
}