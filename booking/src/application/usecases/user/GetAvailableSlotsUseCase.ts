import { AvailabilityEntity } from '../../../domain/entities/Booking';
import { IGetAvailableSlotsUseCase } from '../../interfaces/user/IGetAvailableSlotsUseCase';
import { IAvailbilityRepositary } from '../../../domain/interfaces/IAvailabilityRepostitary';
import { NotFoundError } from '@sahhhallroadmappro/common';

export class GetAvailableSlotsUseCase implements IGetAvailableSlotsUseCase {
    constructor(private availabilityRepository: IAvailbilityRepositary) { }

    async execute(mentorId: string): Promise<AvailabilityEntity | null> {
        const availability = await this.availabilityRepository.getAvailibilityByMentorId(mentorId);
        if (!availability) {
            throw new NotFoundError();
        }
        return availability;
    }
}
