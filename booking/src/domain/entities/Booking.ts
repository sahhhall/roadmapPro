import { BookinStatus } from "@sahhhallroadmappro/common";


export class TimeSlotEntity {
    constructor(
        public startTime: string,
        public endTime: string,
        public isBooked?: boolean
    ) { }
}


export class DailyScheduleEntity {
    constructor(
        public isAvailable: boolean,
        public timeSlots: TimeSlotEntity[] = []
    ) { }
}

//////////////////////////////////////////////////////////

export class WeeklyScheduleEntity {
    constructor(
        public monday: DailyScheduleEntity,
        public tuesday: DailyScheduleEntity,
        public wednesday: DailyScheduleEntity,
        public thursday: DailyScheduleEntity,
        public friday: DailyScheduleEntity
    ) { }
}

////////////////////////////////////////////////////////
export class AvailabilityEntity {
    constructor(
        public mentorId: string,
        public weeklySchedule: WeeklyScheduleEntity,
        public pricePerSession: number,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) { }
}

export class BookingEntity {
    constructor(
        public menteeId: any,
        public mentorId: any,
        public date: string,
        public status: BookinStatus = BookinStatus.Created,
        public paymentStatus: 'pending' | 'paid' | 'refunded' = 'pending',
        public expiresAt: Date,
        public id: string,
        public roomId: string,
        public videoCallLink?: string,
        public cancelledAt?: Date,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) { }
}





///


export class DayBooking {
    constructor(
        public _id: number,
        public totalBookings: number
    ) {}
}
