import { IQuestionRepo } from "../../../domain/interfaces/IQuestionRepo";
import { IStackRepo } from "../../../domain/interfaces/IStackRepo";
import { IDeleteStackUseCase } from "../../interfaces/admin/IDeleteStackUseCase";


export class DeleteStackUseCase implements IDeleteStackUseCase {
    constructor(private stackRepository: IStackRepo, private questionRepositary: IQuestionRepo) { }
    async execute(id: string): Promise<boolean> {
        await this.questionRepositary.deleteQuestionsByStackId(id)
        return await this.stackRepository.deleteStack(id)
    }
}