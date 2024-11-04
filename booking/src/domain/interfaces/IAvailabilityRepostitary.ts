import { AvailabilityEntity } from "../entities/Booking";


export interface IAvailbilityRepositary {
    getAvailibilityByMentorId(mentorId: string): Promise<AvailabilityEntity | null>

    create(attrs: Partial<AvailabilityEntity>): Promise<AvailabilityEntity | null>

    update(mentorId: string, updateFileds: Partial<AvailabilityEntity>): Promise<AvailabilityEntity | null>

    updatePrice(mentorId: string, price: string): Promise<AvailabilityEntity | null>
}