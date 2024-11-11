import { v4 as uuidv4 } from 'uuid';
import { BookinStatus } from "@sahhhallroadmappro/common";
import { BookingEntity } from "../../domain/entities/Booking";
import { IBookingRepositary } from "../../domain/interfaces/IBookingRepositary";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { Booking } from "../database/mongodb/schemas/booking.schema";
import { UserBooking } from "../database/mongodb/schemas/usermentor.schema";

export class BookingRepositary implements IBookingRepositary {

    async create(booking: Partial<BookingEntity>, expireAt: Date): Promise<BookingEntity> {
        try {
            const roomId = uuidv4();
            const baseUrl = process.env.FRONT_END_BASE_URL + `/meet` || 'http://localhost:5173/meet';
            console.log(booking.date, "from db")
            const newBooking = await Booking.build({
                menteeId: booking!.menteeId as string,
                mentorId: booking!.mentorId as string,
                date: booking!.date as string,
                status: BookinStatus.Created,
                expiresAt: expireAt,
                roomId: roomId,
                videoCallLink: `${baseUrl}/${roomId}`
            });
            await newBooking.save();
            return newBooking
        } catch (error: any) {
            customLogger.error(`db error create booking booking-service: ${error.message}`);
            throw new Error(`db error create booking booking-service: ${error.message}`);
        }
    };

    async findById(id: string): Promise<BookingEntity | null> {
        try {
            const booking = await Booking.findById(id).populate({
                path: 'menteeId mentorId'
            });
            return booking
        } catch (error: any) {
            customLogger.error(`db error findById to fetch booking booking-service: ${error.message}`);
            throw new Error(`db error findById booking booking-service: ${error.message}`);
        }
    };

    async findByMentorId(mentorId: string, query?: any): Promise<BookingEntity[]> {
        try {
            if (!query) {
                query.status = { $in: [BookinStatus.Created, BookinStatus.Scheduled] };
            }
            const bookings = await Booking.find(query);
            return bookings
        } catch (error: any) {
            customLogger.error(`db error to find bookings booking booking-service: ${error.message}`);
            throw new Error(`db error to find bookings booking booking-service: ${error.message}`);
        }
    }

    async findAllBookingByStatus(userId: string, status?: string): Promise<BookingEntity[]> {
        try {
            const query: any = {
                $or: [
                    { mentorId: userId },
                    { menteeId: userId }
                ]
            }
            if (status) {
                query.status = status;
            } else {
                query.status = { $in: [BookinStatus.Created, BookinStatus.Scheduled] };
            }
            const bookings = await Booking.find(query);
            return bookings
        } catch (error: any) {
            customLogger.error(`db error to find bookings booking booking-service: ${error.message}`);
            throw new Error(`db error to find bookings booking booking-service: ${error.message}`);
        }
    }

    async findByMenteeId(menteeId: string): Promise<BookingEntity[]> {
        try {
            const bookings = await Booking.find({ menteeId });
            return bookings
        } catch (error: any) {
            customLogger.error(`db error to find bookingd by mentee booking booking-service: ${error.message}`);
            throw new Error(`db error to find bookings by mentee booking booking-service: ${error.message}`);
        }
    };

    // async checkAvailability(mentorId: string, startTime: string, endTime: string): Promise<boolean> {
    //     try {
    //         const booking = await Booking.findOne({
    //             mentorId,
    //             $and: [
    //                 { status: { $nin: [BookinStatus.Cancelled] } },
    //                 {
    //                     $or: [
    //                         {
    //                             startTime: startTime,
    //                             endTime: endTime
    //                         }
    //                     ]
    //                 }
    //             ]
    //         })
    //         return !booking
    //     } catch (error: any) {
    //         customLogger.error(`db error to find bookingd by mentee booking booking-service: ${error.message}`);
    //         throw new Error(`db error to find bookings by mentee booking booking-service: ${error.message}`);
    //     }
    // }
    async updateStatus(bookingId: string, newStatus: string): Promise<BookingEntity | null> {
        try {
            const booking = await Booking.findByIdAndUpdate(bookingId, {
                $set: { status: newStatus },
            }, {
                new: true
            });
            await booking!.save();
            return booking;
        } catch (error: any) {
            customLogger.error(`db error updating booking status booking-service: ${error.message}`);
            throw new Error(`db error updating booking status booking-service: ${error.message}`);
        }
    }

}

