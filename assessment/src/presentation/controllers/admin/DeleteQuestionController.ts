import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IDeleteQuestionUseCase } from '../../../application/interfaces/admin/IDeleteQuestionUseCase';


export class DeleteQuestionController {
    constructor(private readonly deleteQuestionUseCase: IDeleteQuestionUseCase) { };

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            await this.deleteQuestionUseCase.execute(id);
            return res.status(HttpStatus.ACCEPTED).json({ message: "successfully delteed" })
        } catch (error) {
            next(error)
        }
    }
}