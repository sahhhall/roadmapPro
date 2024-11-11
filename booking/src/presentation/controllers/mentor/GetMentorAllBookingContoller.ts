import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { IGetMentorAllBookingDetailsUseCase } from '../../../application/interfaces/mentor/IGetMentorAllBookingDetailsUseCase';

export class GetMentorAllBookingContoller {
    constructor(private readonly getAllDetailByMentor: IGetMentorAllBookingDetailsUseCase) { }

    async getBookings(req: Request, res: Response, next: NextFunction) {
        try {
            const { mentorId } = req.params; 
            const bookings = await this.getAllDetailByMentor.execute(mentorId);
            return res.status(HttpStatus.OK).json(bookings);
        } catch (error) {
            next(error);
        }
    }
}
