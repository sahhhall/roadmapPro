import { BookinStatus } from "@sahhhallroadmappro/common";
import { IBookingRepositary } from "../../../domain/interfaces/IBookingRepositary";
import { IGetBookingsCountAndUserUseCase } from "../../interfaces/admin/IGetBookingsCountAndUserUseCase";
import { IUserRepository } from "../../../domain/interfaces/IUserRepositary";

export class GetBookingsCountAndUserUseCase implements IGetBookingsCountAndUserUseCase {
    constructor(private bookingRepository: IBookingRepositary, private userRepo: IUserRepository) { }

    async execute(): Promise<any | null> {
        const totalUser = await this.userRepo.getCount();
        const totolBookings = await this.bookingRepository.getCount();
        return {
            totalUser,
            totolBookings
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