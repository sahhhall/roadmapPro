import { BookinStatus } from "@sahhhallroadmappro/common";
import { DayBooking } from "../../../domain/entities/Booking";
import { IBookingRepositary } from "../../../domain/interfaces/IBookingRepositary";
import { IGetAnalyticsUseCase } from "../../interfaces/admin/IGetAnalyticsUseCase";

export class GetAnalyticsUseCase implements IGetAnalyticsUseCase {
    constructor(private bookingRepository: IBookingRepositary) { }

    async execute(days: string): Promise<any | null> {
        const monthBaseBookings = new Array(12).fill(0);
        const monthBaseCompleted = new Array(12).fill(0);

        const currentYear = new Date().getFullYear();
        const startDate = new Date(currentYear, 0, 1);
        const endDate = new Date(currentYear, 11, 31);


        const bookingsData = await this.bookingRepository.daysBaseBookings(startDate, endDate);

        bookingsData?.forEach((item) => {
            monthBaseBookings[item._id - 1] = item.totalBookings;
        });

        const completedBookingsData = await this.bookingRepository.daysBaseBookings(
            startDate,
            endDate,
            BookinStatus.Complete
        );

        completedBookingsData?.forEach((item) => {
            monthBaseCompleted[item._id - 1] = item.totalBookings;
        });
        return {
            monthBaseBookings,
            monthBaseCompleted,
            metadata: {
                year: currentYear,
                totalBookings: monthBaseBookings.reduce((a, b) => a + b, 0),
                totalCompleted: monthBaseCompleted.reduce((a, b) => a + b, 0),
            }
        }

    }
}


// return {
//     data: {
//         grossRevenue: {
//             pillText: "2.3%", 
//             trend: "up",   
//             period: days,    
//         },
//     },
// };