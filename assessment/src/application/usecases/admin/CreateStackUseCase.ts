import { ConflictError } from "@sahhhallroadmappro/common";
import { Stack } from "../../../domain/entities/Assessment";
import { IStackRepo } from "../../../domain/interfaces/IStackRepo";
import { ICreateStackUseCase } from "../../interfaces/admin/ICreateStackUseCase";


export class CreateStackUseCase implements ICreateStackUseCase {
    constructor(private stackRepository: IStackRepo) { }
    async execute(name: string): Promise<Stack | any> {
        const existingStack = await this.stackRepository.findStackByName(name)
        if (existingStack) {
            throw new ConflictError(`A stack with the name '${name}' already exists`)
        }
        const newStack = await this.stackRepository.createStack(name);
        return newStack;
    }
}