

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
