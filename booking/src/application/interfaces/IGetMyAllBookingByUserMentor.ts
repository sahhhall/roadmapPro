import { BookingEntity } from "../../domain/entities/Booking";

//here userId or mentorId
export interface IGetMyAllBookingByUserMentor {
    execute(userId: string, status?: string| undefined): Promise<BookingEntity[] | null>
}