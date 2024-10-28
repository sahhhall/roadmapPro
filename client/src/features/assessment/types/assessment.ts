
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