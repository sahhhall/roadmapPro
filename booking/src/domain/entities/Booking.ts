export class TimeSlotEntity {
    constructor(
        public startTime: string,
        public endTime: string
    ) {}
}


export class DailyScheduleEntity {
    constructor(
        public isAvailable: boolean,
        public timeSlots: TimeSlotEntity[] = []
    ) {}
}

//////////////////////////////////////////////////////////

export class WeeklyScheduleEntity {
    constructor(
        public monday: DailyScheduleEntity,
        public tuesday: DailyScheduleEntity,
        public wednesday: DailyScheduleEntity,
        public thursday: DailyScheduleEntity,
        public friday: DailyScheduleEntity
    ) {}
}

////////////////////////////////////////////////////////
export class AvailabilityEntity {
    constructor(
        public mentorId: string,
        public weeklySchedule: WeeklyScheduleEntity,
        public pricePerSession: number,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}
}

export class BookingEntity {
    constructor(
        public menteeId: string,
        public mentorId: string,
        public startTime: Date,
        public endTime: Date,
        public date: Date,
        public status: 'pending' | 'confirmed' | 'completed' | 'cancelled' = 'pending',
        public paymentStatus: 'pending' | 'paid' | 'refunded' = 'pending',
        public videoCallLink?: string,
        public cancelledAt?: Date,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}
}
