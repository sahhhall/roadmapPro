
export interface AllStacksResponse {
    name: string,
    createdAt: string,
    updatedAt: string,
    id: string
}


export interface AllQuestionsByStackResponse {
    stackId: string,
    question: string,
    options: [string],
    correctAnswer: string,
    createdAt: string,
    updatedAt: string,
    id: string
}




//question creation

export interface CreateQuestionRequest {
    stackId: string,
    question: string,
    options: string[],
    correctAnswer: string,
}




export interface TestsReponse {
    id: string;
    userId: string;
    stackId: {
        _id: string,
        name: string,
        createdAt: string
    };
    experience: string;
    bio: string;
    headline: string;
    languages: string[];
    duration: number;
    status: string;
    score: number;
    questions: any;
    githubUrl: string;
    linkedinUrl: string;
    createdAt: string;
    updatedAt: string;
    result: string;
    percentage: string;
    resultFeedback?: string;
}