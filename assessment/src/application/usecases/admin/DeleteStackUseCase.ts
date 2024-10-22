import { IStackRepo } from "../../../domain/interfaces/IStackRepo";
import { IDeleteStackUseCase } from "../../interfaces/admin/IDeleteStackUseCase";


export class DeleteStackUseCase implements IDeleteStackUseCase {
    constructor(private stackRepository: IStackRepo) { }
    async execute(id: string): Promise<boolean> {
        return await this.stackRepository.deleteStack(id)
    }
}