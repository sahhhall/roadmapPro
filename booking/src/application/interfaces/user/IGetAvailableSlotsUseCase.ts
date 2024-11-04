import { AvailabilityEntity } from '../../../domain/entities/Booking';

export interface IGetAvailableSlotsUseCase {
    execute(mentorId: string): Promise<AvailabilityEntity | null>;
}
