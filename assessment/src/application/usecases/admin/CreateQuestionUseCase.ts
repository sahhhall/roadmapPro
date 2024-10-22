import { ConflictError } from "@sahhhallroadmappro/common";
import { Question, Stack } from "../../../domain/entities/Assessment";
import { IStackRepo } from "../../../domain/interfaces/IStackRepo";
import { ICreateQuestionUseCase } from "../../interfaces/admin/ICreateQuestionUseCase";
import { IQuestionRepo } from "../../../domain/interfaces/IQuestionRepo";


export class CreateQuestionUseCase implements ICreateQuestionUseCase {
    constructor(private questionRepository: IQuestionRepo) { }
    async execute(questionData: Partial<Question>): Promise<Question | any> {
        const question = new Question(
            questionData.stackId as any,
            questionData.question as string,
            questionData.options as string[],
            questionData.correctAnswer as string
        );
        const newStack = await this.questionRepository.createQuestion(question);
        return newStack;
    }
}