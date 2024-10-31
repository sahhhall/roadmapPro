import { NotFoundError } from "@sahhhallroadmappro/common";
import { Test } from "../../../domain/entities/Assessment";
import { ITestRepo } from "../../../domain/interfaces/ITestRepo";
import { IUpdateTestUseCase } from "../../interfaces/admin/IUpdateTestUseCase";


export class UpdateTestUseCase implements IUpdateTestUseCase {
    constructor(private testRepository: ITestRepo) { }
    async execute(test: Partial<Test>): Promise<any | null> {
        const updatedTest = await this.testRepository.updateTest(test.id as string, { ...test }) as any
        return updatedTest
    }
}