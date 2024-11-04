import { AvailabilityEntity } from "../../../domain/entities/Booking";


export interface IPriceUpdateUseCase {
    execute(data: { mentorId: string; pricePerSession: number }): Promise<AvailabilityEntity | null>
}