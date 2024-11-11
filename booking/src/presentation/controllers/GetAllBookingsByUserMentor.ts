import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetMyAllBookingByUserMentor } from '../../application/interfaces/IGetMyAllBookingByUserMentor';

//this contorller for getting all booking details in profile 
export class GetAllBookingsByUserMentor {
    constructor(private readonly getAllBookingDetails: IGetMyAllBookingByUserMentor) { }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { status } = req.query;
            const bookings = await this.getAllBookingDetails.execute(userId, status as string);
            return res.status(HttpStatus.OK).json(bookings);
        } catch (error) {
            next(error);
        }
    }
}
