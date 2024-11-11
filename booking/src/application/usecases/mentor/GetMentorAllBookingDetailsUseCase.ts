import { BookinStatus } from '@sahhhallroadmappro/common';
import { BookingEntity } from '../../../domain/entities/Booking';
import { IBookingRepositary } from '../../../domain/interfaces/IBookingRepositary';
import { IGetMentorAllBookingDetailsUseCase } from '../../interfaces/mentor/IGetMentorAllBookingDetailsUseCase';


export class GetMentorAllBookingDetailsUseCase implements IGetMentorAllBookingDetailsUseCase {
    constructor(private bookingRepositary: IBookingRepositary) { }

    async execute(mentorId: string): Promise<BookingEntity[] | null> {
        const query = {
            mentorId: mentorId,
            status: { $in: [BookinStatus.Created, BookinStatus.Scheduled] }
        };
        const bookings = await this.bookingRepositary.findByMentorId(mentorId, query);
        return bookings
    }
}
