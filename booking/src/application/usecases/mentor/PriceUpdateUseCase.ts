import { AvailabilityEntity, WeeklyScheduleEntity } from '../../../domain/entities/Booking';
import { IAvailbilityRepositary } from '../../../domain/interfaces/IAvailabilityRepostitary';
import { IPriceUpdateUseCase } from '../../interfaces/mentor/IPriceUpdateUseCase';

export class PriceUpdateUseCase implements IPriceUpdateUseCase {
    constructor(private availabilityRepository: IAvailbilityRepositary) { }

    async execute(data: { mentorId: string; pricePerSession: number }): Promise<AvailabilityEntity | null> {
        let availability = await this.availabilityRepository.getAvailibilityByMentorId(data.mentorId) as any;
        if (!availability) {
            const emtpySchedule: WeeklyScheduleEntity = {
                monday: { isAvailable: false, timeSlots: [] },
                tuesday: { isAvailable: false, timeSlots: [] },
                wednesday: { isAvailable: false, timeSlots: [] },
                thursday: { isAvailable: false, timeSlots: [] },
                friday: { isAvailable: false, timeSlots: [] }
            };

            availability = await this.availabilityRepository.create({
                mentorId: data.mentorId,
                weeklySchedule: emtpySchedule,
                pricePerSession: 0
            })
        }

        const updatedAvailability = await this.availabilityRepository.update(data.mentorId, { pricePerSession: data.pricePerSession });
        return updatedAvailability;
    }
}
