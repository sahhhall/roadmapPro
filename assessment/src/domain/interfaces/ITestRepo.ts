import { Test } from "../entities/Assessment";

export interface ITestRepo {
    createTest(test: Test): Promise<Test>;
    updateTest(id: string, test: Partial<Test>): Promise<Test | null>;
    deleteTest(id: string): Promise<boolean>;
    findTest(id: string): Promise<Test| null>
}
