import { Test } from "../../domain/entities/Assessment";
import { Test as TestDB } from "../database/mongodb/schemas/test.schema";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { ITestRepo } from "../../domain/interfaces/ITestRepo";

export class TestRepository implements ITestRepo {
    async createTest(test: Test): Promise<Test> {
        try {
            const createdTest = TestDB.build(test);
            await createdTest.save();
            return createdTest;
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: create test - ${error.message}`);
        }
    }

    async updateTest(id: string, test: Partial<Test>): Promise<Test | null> {
        try {
            return await TestDB.findByIdAndUpdate(id, test, { new: true });
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: update test - ${error.message}`);
        }
    }

    async deleteTest(id: string): Promise<boolean> {
        try {
            const result = await TestDB.findByIdAndDelete(id);
            return !!result;
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: delete test - ${error.message}`);
        }
    }
    async findTest(id: string): Promise<Test | null> {
        try {
            return await TestDB.findById(id)
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: fetch test - ${error.message}`);
        }
    }

    async findTestByUserId(userId: string,stackId: string): Promise<Test[] | null> {
        try {
            const tests = await TestDB.find({ userId: userId, stackId:stackId})
            return tests
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: fetch test - ${error.message}`);
        }
    }

}
