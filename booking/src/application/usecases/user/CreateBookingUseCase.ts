import { AvailabilityEntity, BookingEntity } from '../../../domain/entities/Booking';
import { NotFoundError } from '@sahhhallroadmappro/common';
import { ICreateBookingUseCase } from '../../interfaces/user/ICreateBookingUseCase';
import { IBookingRepositary } from '../../../domain/interfaces/IBookingRepositary';
import { IAvailbilityRepositary } from '../../../domain/interfaces/IAvailabilityRepostitary';


const EXIPIRATION_WINDOW_SECONDS = 5 * 60;
export class CreateBookingUseCase implements ICreateBookingUseCase {
    constructor(private bookingRepositary: IBookingRepositary, private availabilityRepository: IAvailbilityRepositary) { }

    async execute(booking: Partial<BookingEntity>): Promise<BookingEntity | null> {

        //check mentor exist
        

        //check mentro availbility

        //check confilcts

        const expirition = new Date();
        //adding secondd time that mean adding 5 minutees extra  that i mentiond 
        expirition.setSeconds(expirition.getSeconds() + EXIPIRATION_WINDOW_SECONDS)
        const bookingData = await this.bookingRepositary.create(booking, expirition)
        return bookingData
    }
}
