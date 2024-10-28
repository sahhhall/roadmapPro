import { Test } from "../entities/Assessment";

export interface ITestRepo {
    createTest(test: Test): Promise<Test>;
    updateTest(id: string, test: Partial<Test>): Promise<Test | null>;
    deleteTest(id: string): Promise<boolean>;
    findTest(id: string): Promise<Test | null>;
    findTestByUserId(userId: string,stackId:string): Promise<Test[] | null> //the reason if filter stack base there will lot of docs 1b users 1b attend 1b doc in user case ..
}
