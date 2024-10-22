import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IDeleteStackUseCase } from '../../../application/interfaces/admin/IDeleteStackUseCase';


export class DeleteStackController {
    constructor(private readonly deleteStackUseCase: IDeleteStackUseCase) { };

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            await this.deleteStackUseCase.execute(id);
            return res.status(HttpStatus.ACCEPTED).json({ message: "successfully delteed" })
        } catch (error) {
            next(error)
        }
    }
}