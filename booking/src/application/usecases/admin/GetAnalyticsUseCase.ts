import { BookinStatus } from "@sahhhallroadmappro/common";
import { DayBooking } from "../../../domain/entities/Booking";
import { IBookingRepositary } from "../../../domain/interfaces/IBookingRepositary";
import { IGetAnalyticsUseCase } from "../../interfaces/admin/IGetAnalyticsUseCase";

export class GetAnalyticsUseCase implements IGetAnalyticsUseCase {
    constructor(private bookingRepository: IBookingRepositary) { }

    async execute(days: string): Promise<any | null> {
        const numberOfDays = Number(days);

        //  the array with zeros for each day
        const dayBaseBookings = new Array(numberOfDays).fill(0);
        const dayBaseCompleted = new Array(numberOfDays).fill(0)
        // curr date
        const endDate = new Date();

        // date generaic(30 for now) days ago 
        const dateXDaysAgo = new Date();
        dateXDaysAgo.setDate(endDate.getDate() - numberOfDays);

        const bookingsData = await this.bookingRepository.daysBaseBookings(dateXDaysAgo, endDate);

        //  fetched data into the dayBaseBookings array
        bookingsData!.forEach((item) => {
            dayBaseBookings[item._id - 1] = item.totalBookings
        });

        const completedBookingsData = await this.bookingRepository.daysBaseBookings(
            dateXDaysAgo,
            endDate,
            BookinStatus.Complete
        );
        completedBookingsData?.forEach((item) => {
            dayBaseCompleted[item._id - 1] = item.totalBookings;
        });

        return {
            dayBaseBookings,
            dayBaseCompleted
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