

import { Question, Test } from "../../../domain/entities/Assessment";
import { IQuestionRepo } from "../../../domain/interfaces/IQuestionRepo";
import { ICreateTestUseCase } from "../../interfaces/user/ITestCreateUseCase";
import { ITestRepo } from "../../../domain/interfaces/ITestRepo";
import { ConflictError, NotFoundError } from "@sahhhallroadmappro/common";


export class CreateTestUseCase implements ICreateTestUseCase {
    constructor(private testRepository: ITestRepo, private questioRepositary: IQuestionRepo) { }
    async execute(testData: Omit<Test, 'questions' | 'duration' | 'score' | 'status'>): Promise<Test | any> {
        const questions = await this.questioRepositary.getRandomQuestions(testData.stackId, 5) as any;
        if (questions!.length < 5) {
            throw new NotFoundError()
        }
        const existingTestsByUser = await this.testRepository.findTestByUserId(testData.userId as string, testData.stackId);
        const currentDate = new Date();
        if (existingTestsByUser) {
            for (const existingTest of existingTestsByUser) {
                if (existingTest.stackId == testData.stackId && existingTest.result === 'passed') {
                    throw new ConflictError(`You already obtained this skill set`)
                }
                const createdAt = new Date(existingTest.createdAt as any);
                const timeDifference = currentDate.getTime() - createdAt.getTime();
                const daysDifference = timeDifference / (1000 * 3600 * 24);
                if (daysDifference < 30) {
                    throw new ConflictError(
                        `You have already attended this stack on ${createdAt.toDateString()}. Please come back after ${30 - Math.floor(daysDifference)
                        } days.`
                    );
                }
            }
        }

        // console.log(questions,'=>',questions?.map((q: any) => q._id), "quession")
        const test = await this.testRepository.createTest({
            ...testData,
            duration: 5,
            status: 'in-progress',
            questions: questions!.map((q: any) => ({
                questionId: q!._id as string,
                userAnswer: undefined,
                isCorrect: undefined
            }))
        });
        return test;
    }
}