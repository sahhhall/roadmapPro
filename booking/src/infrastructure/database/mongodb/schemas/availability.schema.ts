import mongoose, { Schema, Document, Model } from "mongoose";
import { dailyScheduleSchema } from "./dailyschedule.schema";

interface TimeSlot {
    startTime: string,
    endTime: string
}

interface DailySchedule {
    isAvailable: boolean,
    timeSlots: TimeSlot[];
}


interface WeeklySchedule {
    monday: DailySchedule;
    tuesday: DailySchedule;
    wednesday: DailySchedule;
    thursday: DailySchedule;
    friday: DailySchedule;
}



interface AvailabilityAttr {
    mentorId: string;
    weeklySchedule: WeeklySchedule;
    pricePerSession: number;
}

interface AvailabilityDoc extends Document {
    mentorId: string;
    weeklySchedule: WeeklySchedule;
    pricePerSession: number;
}

interface AvailabilityModel extends Model<AvailabilityDoc> {
    build(attrs: AvailabilityAttr): AvailabilityDoc;
}


const availabilitySchema = new Schema<AvailabilityDoc>(
    {
        mentorId: { type: String, required: true },
        weeklySchedule: {
            monday: dailyScheduleSchema,
            tuesday: dailyScheduleSchema,
            wednesday: dailyScheduleSchema,
            thursday: dailyScheduleSchema,
            friday: dailyScheduleSchema
        },
        pricePerSession: { type: Number, required: true },
    },
    {
        toJSON: {
            transform(_, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

availabilitySchema.statics.build = (attrs: AvailabilityAttr) => {
    return new Availability(attrs);
};

const Availability = mongoose.model<AvailabilityDoc, AvailabilityModel>("Availability", availabilitySchema);

export { Availability };
