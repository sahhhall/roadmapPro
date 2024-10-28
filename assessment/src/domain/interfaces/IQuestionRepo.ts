import { Question } from "../entities/Assessment";

export interface IQuestionRepo {
    createQuestion(question: Question): Promise<Question>;
    findQuestionById(id: string): Promise<Question | null>;
    findQuestionByIds(ids: string[]): Promise<Question[]>
    findQuestionsByStackId(stackId: string): Promise<Question[]>;
    updateQuestion(id: string, question: Partial<Question>): Promise<Question | null>;
    deleteQuestion(id: string): Promise<boolean>;
    getRandomQuestions(stackId: string, count: number): Promise<Question[] | null>
    deleteQuestionsByStackId(stackId: string): Promise<boolean>
}
