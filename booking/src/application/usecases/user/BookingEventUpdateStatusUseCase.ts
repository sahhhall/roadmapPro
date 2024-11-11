import { BookinStatus, NotFoundError } from '@sahhhallroadmappro/common';
import { BookingEntity } from '../../../domain/entities/Booking';
import { IBookingRepositary } from '../../../domain/interfaces/IBookingRepositary';
import { IBookingEventUpdateStatusUseCase } from '../../interfaces/user/IBookingEventUpdateStatusUseCase';


export class BookingEventUpdateUseCase implements IBookingEventUpdateStatusUseCase {
    constructor(private bookingRepositary: IBookingRepositary) { }

    async execute(bookingId: string, status: string): Promise<BookingEntity | null> {

        const existBooking = await this.bookingRepositary.findById(bookingId);
        if (!existBooking) {
            throw new NotFoundError()
        };
        //if already completed then return  then it no need of unreservce
        if (existBooking.status === BookinStatus.Complete || existBooking.status === BookinStatus.Scheduled) {
            return null
        }
        const updatedBooking = this.bookingRepositary.updateStatus(bookingId, status);
        return updatedBooking
    }
}
