import { Schema } from "mongoose";

export const dailyScheduleSchema = new Schema({
    isAvailable: { type: Boolean, default: false },
    timeSlots: [
        {
            startTime: { type: String, required: true },
            endTime: { type: String, required: true }
        }
    ]
}, { _id: false })