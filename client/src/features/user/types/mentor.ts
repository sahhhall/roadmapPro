
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