import { Question } from "../../../domain/entities/Assessment";


export interface IGetAllQuestionByStack {
    execute(stackId: string): Promise<Question[] | null>;
}