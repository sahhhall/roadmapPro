import { AvailabilityEntity, BookingEntity } from '../../../domain/entities/Booking';
import { BookinStatus, ConflictError, NotFoundError } from '@sahhhallroadmappro/common';
import { ICreateBookingUseCase } from '../../interfaces/user/ICreateBookingUseCase';
import { IBookingRepositary } from '../../../domain/interfaces/IBookingRepositary';
import { IAvailbilityRepositary } from '../../../domain/interfaces/IAvailabilityRepostitary';


const EXIPIRATION_WINDOW_SECONDS = 5 * 60;
export class CreateBookingUseCase implements ICreateBookingUseCase {
    constructor(private bookingRepositary: IBookingRepositary, private availabilityRepository: IAvailbilityRepositary) { }

    async execute(booking: Partial<BookingEntity>): Promise<BookingEntity | null> {
        //check mentro availbility
        // this for checking mentro aleady takend mentorship class for this date 
        const query = {
            mentorId: booking.mentorId,
            date: booking.date,
            status: { $in: [BookinStatus.Created, BookinStatus.Scheduled] }
        };
        const mentorBooked = await this.bookingRepositary.findByMentorId(booking.mentorId, query);
        //check confilcts
        if (mentorBooked && mentorBooked.length > 0) {
            throw new ConflictError('This time slot is already booked');
        }
        const expirition = new Date();
        //adding secondd time that umean adding 5 minutees extra  that i mentiond 
        expirition.setSeconds(expirition.getSeconds() + EXIPIRATION_WINDOW_SECONDS)
        const bookingData = await this.bookingRepositary.create(booking, expirition)
        return bookingData
    }
}
