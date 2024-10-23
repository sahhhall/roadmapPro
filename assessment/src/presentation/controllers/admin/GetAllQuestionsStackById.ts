import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@sahhhallroadmappro/common";
import { IGetAllQuestionByStack } from "../../../application/interfaces/admin/IGetAllQuestionByStack";



export class GetAllQuestionsController {
    constructor(private getAllQuestons: IGetAllQuestionByStack) { }

    async getQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { stackId } = req.params;
            const questions = await this.getAllQuestons.execute(stackId);
            return res.status(HttpStatus.ACCEPTED).json(questions)
        } catch (error) {
            next(error)
        }
    }
}