import { BookingEntity } from "../../../domain/entities/Booking";


export interface IGetMentorAllBookingDetailsUseCase {
    execute(mentorId: string): Promise<BookingEntity[] | null>
}