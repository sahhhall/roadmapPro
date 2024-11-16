import { File } from "buffer";

export interface AllStacksResponse {
    name: string,
    createdAt: string,
    updatedAt: string,
    id: string
}


export interface MentorAssessmentRegistrationRequest {
    bio: string;
    expirience: string;
    githubUrl: string;
    headline: string;
    languages: string[];
    linkedinUrl: string;
    stackId: string;
}





export interface Question {
    questionId: string;
    _id: string;
}

export interface MentorAssessmentRegistrationResponse {
    userId: string;
    stackId: string;
    expirience: string;
    bio: string;
    headline: string;
    languages: string[];
    duration: number;
    status: string;
    score: number;
    questions: Question[];
    githubUrl: string;
    linkedinUrl: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}



/// test

export interface QuestionResponse {
    id: string;
    question: string;
    options: [string];
}

interface QuestionTest {
    questionId: string;
    userAnswer: string;
}

export interface TestSubmissionRequest {
    id: string;
    questions: QuestionTest[];
}








//

export interface IUserDetailsResponse {
    id: string;
    name: string;
    email: string;
    role: string;
    isGoogle: boolean;
    lastNameChange: Date | null;
    createdAt: Date;
    updatedAt: Date;
}


export interface IMentorDetailsResponse {
    userId: {
        name: string;
        email: string;
        avatar: string;
        _id: string;
    };
    assessedSkills: string[];
    headline: string;
    bio: string;
    languages: string[];
    githubUrl: string;
    linkedinUrl: string;
    experience: string;
    sessionPrice: number;
    totalEarnings: number;
    totalMeetings: number;
    createdAt: Date;
    updatedAt: Date;
    id: string;
}





export interface IMentorUpdateRequest {
    mentorId: string, 
    updatedData: {
        headline?: string;
        bio?: string;
        experience?: string;
    }
}

export interface IUpdateGenericProfileRequest {
    avatar?: File,
    user?:string
}




interface mentorData {
    role: string;
    email: string;
    name: string;
    id: string;
}
export interface IGetAllBookingsResponse {
    menteeId: mentorData;
    mentorId: mentorData;
    date: string;
    status: 'created' | 'scheduled' | 'cancelled' | 'completed';
    paymentStatus: "pending" | "completed";
    expiresAt: string;
    videoCallLink: string;
    createdAt: string;
    roomId: string;
    updatedAt: string;
    id: string;
}



export interface IRoadmapResponse {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: "drafted" | "published";
    nodes: Array<any>;
    edges: Array<any>;
    adminFeedback: string;
    createdAt: string;
    isActive: boolean;
}

