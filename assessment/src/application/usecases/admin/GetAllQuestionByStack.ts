import { Question, Stack } from "../../../domain/entities/Assessment";
import { IQuestionRepo } from "../../../domain/interfaces/IQuestionRepo";
import { IGetAllQuestionByStack } from "../../interfaces/admin/IGetAllQuestionByStack";


export class GetAllQuestions implements IGetAllQuestionByStack {
    constructor(private questionRepository: IQuestionRepo) { }
    async execute(stackId:string): Promise<Question[] | null> {
        const questions = await this.questionRepository.findQuestionsByStackId(stackId);
        return questions
    }
}


