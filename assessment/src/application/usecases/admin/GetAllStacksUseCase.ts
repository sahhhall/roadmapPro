import { Stack } from "../../../domain/entities/Assessment";
import { IStackRepo } from "../../../domain/interfaces/IStackRepo";
import { IGetAllStackUseCase } from "../../interfaces/admin/IGetAllStacksUseCase";



export class GetAllStackUseCase implements IGetAllStackUseCase {
    constructor(private stackRepository: IStackRepo) { }
    async execute(): Promise<Stack[] | null> {
        const stacks = await this.stackRepository.findAllStacks();
        return stacks
    }
}


