import { IQuestionRepo } from "../../../domain/interfaces/IQuestionRepo";
import { IDeleteQuestionUseCase } from "../../interfaces/admin/IDeleteQuestionUseCase";

export class DeleteQuestionUseCase implements IDeleteQuestionUseCase {
    constructor(private questionRepositary: IQuestionRepo) { }
    async execute(id: string): Promise<boolean> {
        return await this.questionRepositary.deleteQuestion(id)
    }
}