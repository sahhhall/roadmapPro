import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetUserDetailsUseCase } from '../../../application/interfaces/user/IGetUserDetailsUseCase';
import { s3Operation } from '../../../infrastructure/service/S3-client';


export class GetUserDetailsController {
    constructor(private readonly getUserDetails: IGetUserDetailsUseCase) { };

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            console.log(userId,"hre")
            const userData = await this.getUserDetails.execute(userId);
            return res.status(HttpStatus.OK).json(userData)
        } catch (error) {
            next(error)
        }
    }
}