import { BookinStatus } from "@sahhhallroadmappro/common";
import { BookingEntity, DayBooking } from "../entities/Booking";


export interface IBookingRepositary {
    create(booking: Partial<BookingEntity>, expireAt: Date): Promise<BookingEntity>;
    findById(id: string): Promise<BookingEntity | null>;
    findByMenteeId(menteeId: string): Promise<BookingEntity[]>;
    findByMentorId(mentorId: string, query?: any): Promise<BookingEntity[]>;
    findAllBookingByStatus(mentorId: string, status?: string): Promise<BookingEntity[]>
    updateStatus(bookingId: string, newStatus: string): Promise<BookingEntity | null>;
    daysBaseBookings(startDate: Date, endDate: Date, status?: BookinStatus): Promise<DayBooking[] | null>
    // checkAvailability(mentorId: string, startTime: string, endTime: string): Promise<boolean>;
    getCount(): Promise<number | null>
}