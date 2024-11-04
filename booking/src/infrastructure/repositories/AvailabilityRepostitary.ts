import { AvailabilityEntity } from "../../domain/entities/Booking";
import { IAvailbilityRepositary } from "../../domain/interfaces/IAvailabilityRepostitary";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { Availability } from "../database/mongodb/schemas/availability.schema"



export class AvailabilityRepository implements IAvailbilityRepositary {

    async getAvailibilityByMentorId(mentorId: string): Promise<AvailabilityEntity> {
        try {
            return await Availability.findOne({mentorId:mentorId}) as AvailabilityEntity
        } catch (error: any) {
            customLogger.error(`DB error: create availabilut ,${error.message}`);
            throw new Error(`DB error: create availabilut - ${error.message}`);
        }
    }

    async create(attrs: Partial<AvailabilityEntity>): Promise<AvailabilityEntity | null> {
        try {
            const availability = Availability.build({
                mentorId: attrs.mentorId as any,
                weeklySchedule: attrs.weeklySchedule as any,
                pricePerSession: attrs.pricePerSession as any,
            })
            await availability.save();
            return availability
        } catch (error: any) {
            customLogger.error(`DB error: create availibility for ${attrs.mentorId} ,${error.message}`);
            throw new Error(`DB error: create availabilut - ${error.message}`);
        }
    };

    async update(mentorId: string, updatedFields: Partial<AvailabilityEntity>): Promise<AvailabilityEntity | null> {
        try {
            console.log(updatedFields.weeklySchedule?.monday.timeSlots,"in ddb updatefield")
            //here data will be added into fields from use case
            //it kinda generic
            ///whereever set set like { price: newdata} and snent like from use case 
            const availability = await Availability.findOneAndUpdate(
                { mentorId },
                { $set: updatedFields },
                { new: true }
            );
            return availability
        } catch (error: any) {
            customLogger.error(`DB error: update availbilit for ${mentorId} ,${error.message}`);
            throw new Error(`DB error: update availbilit for  - ${error.message}`);
        }
    }

}