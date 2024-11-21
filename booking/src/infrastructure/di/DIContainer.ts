import { IAvailibilityUpdateUseCase } from "../../application/interfaces/mentor/IAvailibilityUpdateUseCase";
import { IUserCreatedUseCase } from "../../application/interfaces/IUserCreatedUseCase";
import { AvailabilityUseCase } from "../../application/usecases/mentor/AvailabilityUseCase";
import { UserCreatedUseCase } from "../../application/usecases/UserCreatedUseCase";
import { IAvailbilityRepositary } from "../../domain/interfaces/IAvailabilityRepostitary";
import { IUserRepository } from "../../domain/interfaces/IUserRepositary";
import { AvailabilityRepository } from "../repositories/AvailabilityRepostitary";
import { UserRepository } from "../repositories/UserRepositary";
import { IPriceUpdateUseCase } from "../../application/interfaces/mentor/IPriceUpdateUseCase";
import { PriceUpdateUseCase } from "../../application/usecases/mentor/PriceUpdateUseCase";
import { IGetAvailableSlotsUseCase } from "../../application/interfaces/user/IGetAvailableSlotsUseCase";
import { GetAvailableSlotsUseCase } from "../../application/usecases/user/GetAvailableSlotsUseCase";
import { ICreateBookingUseCase } from "../../application/interfaces/user/ICreateBookingUseCase";
import { CreateBookingUseCase } from "../../application/usecases/user/CreateBookingUseCase";
import { IBookingRepositary } from "../../domain/interfaces/IBookingRepositary";
import { BookingRepositary } from "../repositories/BookingRepositary";
import { IBookingEventUpdateStatusUseCase } from "../../application/interfaces/user/IBookingEventUpdateStatusUseCase";
import { BookingEventUpdateUseCase } from "../../application/usecases/user/BookingEventUpdateStatusUseCase";
import { GetMentorAllBookingDetailsUseCase } from "../../application/usecases/mentor/GetMentorAllBookingDetailsUseCase";
import { IGetMentorAllBookingDetailsUseCase } from "../../application/interfaces/mentor/IGetMentorAllBookingDetailsUseCase";
import { IGetMyAllBookingByUserMentor } from "../../application/interfaces/IGetMyAllBookingByUserMentor";
import { GetMyAllBookingByUserMentor } from "../../application/usecases/GetMyAllBookingByUserMentor";
import { IGetAnalyticsUseCase } from "../../application/interfaces/admin/IGetAnalyticsUseCase";
import { GetAnalyticsUseCase } from "../../application/usecases/admin/GetAnalyticsUseCase";
import { IGetBookingsCountAndUserUseCase } from "../../application/interfaces/admin/IGetBookingsCountAndUserUseCase";
import { GetBookingsCountAndUserUseCase } from "../../application/usecases/admin/GetBookingsCountAndUserUseCase";
import { IGetUserOrMentorUseCase } from "../../application/interfaces/IGetUserOrMentorUseCase";
import { GetUserOrMentorUseCase } from "../../application/usecases/GetUserOrMentorUseCase";



export class DIContainer {
    private static instance: DIContainer;
    private _userRepositary: IUserRepository;
    private _availabilityRepositary: IAvailbilityRepositary;
    private _bookingRepositary: IBookingRepositary;
    private constructor() {
        this._userRepositary = new UserRepository();
        this._availabilityRepositary = new AvailabilityRepository();
        this._bookingRepositary = new BookingRepositary();
    }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    };

    //for kafka
    public userCreatedUseCase(): IUserCreatedUseCase {
        return new UserCreatedUseCase(this._userRepositary);
    }

    public getUserByIdUseCase(): IGetUserOrMentorUseCase {
        return new GetUserOrMentorUseCase(this._userRepositary);
    }

    /// availability

    public updateSlotAvailabilityUseCase(): IAvailibilityUpdateUseCase {
        return new AvailabilityUseCase(this._availabilityRepositary);
    }

    public priceUpdateUseCase(): IPriceUpdateUseCase {
        return new PriceUpdateUseCase(this._availabilityRepositary)
    }

    public getAvailableSlotsUseCase(): IGetAvailableSlotsUseCase {
        return new GetAvailableSlotsUseCase(this._availabilityRepositary)
    }


    //booking

    public createBookingUseCase(): ICreateBookingUseCase {
        return new CreateBookingUseCase(this._bookingRepositary, this._availabilityRepositary)
    };

    public updateStatusExipiredBooking(): IBookingEventUpdateStatusUseCase {
        return new BookingEventUpdateUseCase(this._bookingRepositary)
    }

    public getAllBookingByMentorId(): IGetMentorAllBookingDetailsUseCase {
        return new GetMentorAllBookingDetailsUseCase(this._bookingRepositary)
    }

    public getAllBookingToProfile(): IGetMyAllBookingByUserMentor {
        return new GetMyAllBookingByUserMentor(this._bookingRepositary)
    }


    public getAnalyticsBylast30(): IGetAnalyticsUseCase {
        return new GetAnalyticsUseCase(this._bookingRepositary)
    }
    public getCountForAnalytics(): IGetBookingsCountAndUserUseCase {
        return new GetBookingsCountAndUserUseCase(this._bookingRepositary, this._userRepositary)
    }
}