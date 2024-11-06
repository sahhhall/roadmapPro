import { AvailabilityEntity, WeeklyScheduleEntity } from '../../../domain/entities/Booking'
import { IAvailibilityUpdateUseCase } from '../../interfaces/mentor/IAvailibilityUpdateUseCase'
import { IAvailbilityRepositary } from '../../../domain/interfaces/IAvailabilityRepostitary'



export class AvailabilityUseCase implements IAvailibilityUpdateUseCase {
    constructor(private availabilityRepositary: IAvailbilityRepositary) { }
    async execute(data: Pick<AvailabilityEntity, 'mentorId' | 'weeklySchedule' | 'pricePerSession'>): Promise<AvailabilityEntity | null> {
        let availability = await this.availabilityRepositary.getAvailibilityByMentorId(data.mentorId) as any;
        if (!availability) {
            const emtpySchedule: WeeklyScheduleEntity = {
                monday: { isAvailable: false, timeSlots: [] },
                tuesday: { isAvailable: false, timeSlots: [] },
                wednesday: { isAvailable: false, timeSlots: [] },
                thursday: { isAvailable: false, timeSlots: [] },
                friday: { isAvailable: false, timeSlots: [] }
            };

            availability = await this.availabilityRepositary.create({
                mentorId: data.mentorId,
                weeklySchedule: emtpySchedule,
                pricePerSession: 0
            })
        };
        const oldprice = availability.pricePerSession || 0;
        const updatedSchedule = {
            ...availability!.weeklySchedule,
            ...data.weeklySchedule
        };
        let updatedAvailbility = await this.availabilityRepositary.update(data.mentorId, { weeklySchedule: updatedSchedule, pricePerSession: data?.pricePerSession ? data.pricePerSession : oldprice });
        return updatedAvailbility

    }
}