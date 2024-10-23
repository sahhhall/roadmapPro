import { Question } from "../../../domain/entities/Assessment";


export interface IGetQuestionUseCase {
    execute(questionId: string): Promise<Question | null>;
}