import { IUserCreatedUseCase } from '../interfaces/IUserCreatedUseCase';

import { IGetMyAllBookingByUserMentor } from '../interfaces/IGetMyAllBookingByUserMentor';
import { IBookingRepositary } from '../../domain/interfaces/IBookingRepositary';
import { BookingEntity } from '../../domain/entities/Booking';


export class GetMyAllBookingByUserMentor implements IGetMyAllBookingByUserMentor {
    constructor(private bookingRepositary: IBookingRepositary) { }
    async execute(userId: string, status: string | undefined): Promise<BookingEntity[] | null> {
        const bookings = await this.bookingRepositary.findAllBookingByStatus(userId, status);
        return bookings;
    }
}