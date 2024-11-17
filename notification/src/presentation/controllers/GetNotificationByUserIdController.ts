import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IFetchNotificationsUseCase } from '../../application/interfaces/IFetchNotificationsUseCase';


// jere the reeason why i take mail for email senting purpolse need mail so i used here also
export class GetUserNotificationByemailController {
    constructor(private readonly getNotifcaionByUserMail: IFetchNotificationsUseCase) { }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { mail } = req.params;
            const { limit = 10, skip = 0 } = req.query;
            console.log(mail)
            const notifications = await this.getNotifcaionByUserMail.execute(mail, parseInt(limit as string), parseInt(skip as string));
            return res.status(HttpStatus.OK).json(notifications);
        } catch (error) {
            next(error);
        }
    }
}
