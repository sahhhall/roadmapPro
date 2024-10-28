import { NotFoundError } from "@sahhhallroadmappro/common";
import { Test } from "../../../domain/entities/Assessment";
import { IQuestionRepo } from "../../../domain/interfaces/IQuestionRepo";
import { ITestRepo } from "../../../domain/interfaces/ITestRepo";
import { IEvaluateTestUseCase } from "../../interfaces/user/IEvaluateTestUseCase";



export class EvaluateTest implements IEvaluateTestUseCase {
    constructor(private testRepository: ITestRepo, private questioRepositary: IQuestionRepo) { }
    async execute(submittedData: Pick<Test, 'questions' | 'id'>): Promise<Test | null> {
        const test = await this.testRepository.findTest(submittedData.id as string);
        if (!test) {
            throw new NotFoundError();
        }
        const questionIds = test.questions.map(question => question.questionId as string);
        const questions = await this.questioRepositary.findQuestionByIds(questionIds);
        let score = 0;
        //this for evalutate question score
        questions.forEach(q => {
            const questionData = submittedData.questions.find((question) =>
                question.questionId === q.id
            );

            if (questionData && questionData.userAnswer === q.correctAnswer) {
                score++
            }
        });
        const totalQuestino = questions.length;
        const passingScore = Math.ceil(totalQuestino * 0.8);
        console.log(passingScore);
        let result = 'pending' as any;
        let resultFeedback;
        if (passingScore < score) {
            result = 'failed';
            resultFeedback = 'you cant reach asssessment criteria level'
        }
        const evaluatedTest = await this.testRepository.updateTest(submittedData!.id as string, {
            score: score,
            status: 'completed',
            result,
            resultFeedback
        });
        return evaluatedTest

    }
}