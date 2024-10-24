

import { Question, Test } from "../../../domain/entities/Assessment";
import { IQuestionRepo } from "../../../domain/interfaces/IQuestionRepo";
import { ICreateTestUseCase } from "../../interfaces/user/ITestCreateUseCase";
import { ITestRepo } from "../../../domain/interfaces/ITestRepo";
import { NotFoundError } from "@sahhhallroadmappro/common";


export class CreateTestUseCase implements ICreateTestUseCase {
    constructor(private testRepository: ITestRepo, private questioRepositary: IQuestionRepo) { }
    async execute(testData: Omit<Test, 'questions' | 'duration' | 'score' | 'status'>): Promise<Test | any> {
        const questions = await this.questioRepositary.getRandomQuestions(testData.stackId, 5) as any;
        if (questions!.length < 5) {
            throw new NotFoundError()
        }
        // console.log(questions,'=>',questions?.map((q: any) => q._id), "quession")
        const test = await this.testRepository.createTest({
            ...testData,
            duration: 5,
            status: 'in-progress',
            questions: questions!.map((q: any )=> ({
                questionId: q!._id as string,
                userAnswer: undefined,
                isCorrect: undefined    
            }))
        });
        return test;
    }
}