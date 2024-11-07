import { BookingEntity } from "../../../domain/entities/Booking";





export interface IBookingEventUpdateStatusUseCase {
    execute(bookingId: string, status: string): Promise<BookingEntity | null>;
}
