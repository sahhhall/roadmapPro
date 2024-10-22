import { Question } from "../../../domain/entities/Assessment";

export interface ICreateQuestionUseCase {
    execute(data: Partial<Question>): Promise<Question | null>;
}