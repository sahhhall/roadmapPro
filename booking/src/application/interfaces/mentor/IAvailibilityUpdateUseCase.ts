import { AvailabilityEntity } from "../../../domain/entities/Booking";


export interface IAvailibilityUpdateUseCase {
    execute(data: Pick<AvailabilityEntity, 'mentorId' | 'weeklySchedule'|'pricePerSession'>): Promise<AvailabilityEntity | null>
}