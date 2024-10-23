import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@sahhhallroadmappro/common";
import { IGetAllQuestionByStack } from "../../../application/interfaces/admin/IGetAllQuestionByStack";
import { IGetQuestionUseCase } from "../../../application/interfaces/user/IGetQuestionUseCase";



export class GetQuestionController {
    constructor(private getQuestionUseCase: IGetQuestionUseCase) { }

    async getQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params;
            const question = await this.getQuestionUseCase.execute(questionId);
            const saniteizedQuestion = {
                id: question?.id,
                question: question?.question,
                options: question?.options,

            }
            return res.status(HttpStatus.OK).json(saniteizedQuestion)
        } catch (error) {
            next(error)
        }
    }
}