import { Request, Response, NextFunction } from 'express';
import { ICreateStackUseCase } from '../../../application/interfaces/admin/ICreateStackUseCase';
import { HttpStatus } from '@sahhhallroadmappro/common';


export class CreateStackController {
    constructor(private readonly createStackUseCase: ICreateStackUseCase){};

    async createStack ( req: Request, res: Response, next: NextFunction ) {
        try {
            const { name } = req.body;
            const stack = await this.createStackUseCase.execute(name);
            return res.status(HttpStatus.CREATED).json(stack)
        } catch (error) {
            next(error)
        }
    }
}