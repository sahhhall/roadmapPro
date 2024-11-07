import { BookingEntity } from "../../../domain/entities/Booking";


export interface ICreateBookingUseCase {
    execute(booking: Partial<BookingEntity>): Promise<BookingEntity | null>;
}
