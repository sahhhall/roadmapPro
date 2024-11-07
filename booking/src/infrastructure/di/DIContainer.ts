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
        return new CreateBookingUseCase(this._bookingRepositary,this._availabilityRepositary)
    };
}