import { BookingEntity } from "../../../domain/entities/Booking";


export interface IGetMentorAllBookingDetailsUseCase {
    execute(mentorId: string,status: string): Promise<BookingEntity[] | null>
}