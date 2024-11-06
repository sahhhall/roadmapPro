

export interface UserId {
    name: string;
    email: string;
    avatar: string;
    id: string;
}

export interface GetMentorsResponse {
    userId: UserId;
    assessedSkills: string[];
    headline: string;
    bio: string;
    languages: string[];
    githubUrl: string;
    linkedinUrl: string;
    expirience: string; 
    sessionPrice: number;
    totalMeetings: number;
    createdAt: string;
    id: string;
}







///////////////////////////


interface TimeSlot {
    startTime: string;
    endTime: string;
    isBooked: boolean;
}


interface DailySchedule {
    isAvailable: boolean;
    timeSlots: TimeSlot[];
}


export interface WeeklySchedule {
    monday: DailySchedule;
    tuesday: DailySchedule;
    wednesday: DailySchedule;
    thursday: DailySchedule;
    friday: DailySchedule;
}


export interface MentorAvailabilityResponse {
    weeklySchedule: WeeklySchedule;
    mentorId: string;
    pricePerSession: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}