import { AvailabilityEntity } from "../entities/Booking";


export interface IAvailbilityRepositary {
    getAvailibilityByMentorId(mentorId: string): Promise<AvailabilityEntity >

    create(attrs: Partial<AvailabilityEntity>): Promise<AvailabilityEntity | null>

    update(mentorId: string, updateFileds: Partial<AvailabilityEntity>): Promise<AvailabilityEntity | null>

}