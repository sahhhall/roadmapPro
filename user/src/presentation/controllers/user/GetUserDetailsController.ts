import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetUserDetailsUseCase } from '../../../application/interfaces/user/IGetUserDetailsUseCase';


export class GetUserDetailsController {
    constructor(private readonly getUserDetails: IGetUserDetailsUseCase) { };

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const userData = await this.getUserDetails.execute(userId);
            return res.status(HttpStatus.OK).json(userData)
        } catch (error) {
            next(error)
        }
    }
}