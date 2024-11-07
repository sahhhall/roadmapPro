import { Request, Response, NextFunction } from 'express';
import { BadRequestError, HttpStatus } from '@sahhhallroadmappro/common';
import { IGetAvailableSlotsUseCase } from '../../../application/interfaces/user/IGetAvailableSlotsUseCase';
import { ICreateBookingUseCase } from '../../../application/interfaces/user/ICreateBookingUseCase';
import { BookingCreatedProducer } from '../../../infrastructure/kafka/producers/booking-created-producer';
import kafkaWrapper from '../../../infrastructure/kafka/kafka-wrapper';

export class CreateBookingController {
    constructor(private readonly createBookingUseCase: ICreateBookingUseCase) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { menteeId, mentorId, startTime, endTime, date } = req.body;
            // if( menteeId !==req.user?.id ){
            //     throw new BadRequestError('come with you account vrroo')
            // }
            const bookedData = await this.createBookingUseCase.execute({ menteeId, mentorId, startTime, endTime, date });
            await new BookingCreatedProducer(kafkaWrapper.producer).produce({
                bookingId:bookedData?.id as string,
                expiresAt: bookedData?.expiresAt as any
            })
            return res.status(HttpStatus.CREATED).json(bookedData);
        } catch (error) {
            next(error);
        }
    }
}
