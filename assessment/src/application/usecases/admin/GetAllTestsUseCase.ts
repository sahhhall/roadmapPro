import { Test } from "../../../domain/entities/Assessment";
import { ITestRepo } from "../../../domain/interfaces/ITestRepo";
import { IGetAllTestsUseCase } from "../../interfaces/admin/IGetAllTestsUseCase";

export class GetAllTestsUseCase implements IGetAllTestsUseCase {
    constructor(private testRepository: ITestRepo) { }

    async execute(status?: string, result?: string ): Promise<Test[] | null> {
        const tests = await this.testRepository.findAllTest(status,result);
        return tests;
    }
}
