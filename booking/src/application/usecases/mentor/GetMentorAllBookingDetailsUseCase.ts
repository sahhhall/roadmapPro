import { BookingEntity } from '../../../domain/entities/Booking';
import { IBookingRepositary } from '../../../domain/interfaces/IBookingRepositary';
import { IGetMentorAllBookingDetailsUseCase } from '../../interfaces/mentor/IGetMentorAllBookingDetailsUseCase';


export class GetMentorAllBookingDetailsUseCase implements IGetMentorAllBookingDetailsUseCase {
    constructor(private bookingRepositary: IBookingRepositary) { }

    async execute(mentorId: string,status: string): Promise<BookingEntity[] | null> {
        const bookings = await this.bookingRepositary.findByMentorId(mentorId,status);
        return bookings
    }
}
