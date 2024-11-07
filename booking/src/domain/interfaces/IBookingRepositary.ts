import { BookinStatus } from "@sahhhallroadmappro/common";
import { BookingEntity } from "../entities/Booking";


export interface IBookingRepositary {
    create(booking: Partial<BookingEntity>, expireAt: Date): Promise<BookingEntity>;
    findById(id: string): Promise<BookingEntity | null>;
    findByMenteeId(menteeId: string): Promise<BookingEntity[]>;
    findByMentorId(mentorId: string): Promise<BookingEntity[]>;
    updateStatus(bookingId: string, newStatus: string): Promise<BookingEntity| null>;
    // checkAvailability(mentorId: string, startTime: string, endTime: string): Promise<boolean>;
}