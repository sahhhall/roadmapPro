import { Request, Response, NextFunction } from 'express';
import { BadRequestError, HttpStatus } from '@sahhhallroadmappro/common';
import { IGetNotificationCount } from '../../application/interfaces/IGetNotificationCount';


export class GetNotificationCount {
    constructor(private readonly getNotifcaionCountByUserMail: IGetNotificationCount) { }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { mail } = req.params;
            const user = req.user;
            if(user?.email !== mail){
                throw new BadRequestError('play with your account buddy')
            }
            console.log(mail)
            const notifications = await this.getNotifcaionCountByUserMail.execute(mail);
            return res.status(HttpStatus.OK).json(notifications);
        } catch (error) {
            next(error);
        }
    }
}
