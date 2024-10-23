import { NotFoundError } from "@sahhhallroadmappro/common";
import { Question } from "../../../domain/entities/Assessment";
import { IQuestionRepo } from "../../../domain/interfaces/IQuestionRepo";
import { IGetQuestionUseCase } from "../../interfaces/user/IGetQuestionUseCase";



export class GetQuestionUseCase implements IGetQuestionUseCase {
    constructor(private questionRepo: IQuestionRepo) { }
    async execute(questionId: string): Promise<Question | null> {
        const question = await this.questionRepo.findQuestionById(questionId);
        if (!question) {
            throw new NotFoundError()
        };
        return question
    }
}