import { Request, Response, NextFunction } from 'express';
import { ICreateStackUseCase } from '../../../application/interfaces/admin/ICreateStackUseCase';
import { HttpStatus } from '@sahhhallroadmappro/common';
import { ICreateQuestionUseCase } from '../../../application/interfaces/admin/ICreateQuestionUseCase';
import mongoose from 'mongoose';


export class CreateQuestionController {
    constructor(private readonly createQuestionUseCase: ICreateQuestionUseCase) { };

    async createQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { stackId, question, options, correctAnswer } = req.body;
            const objectId = new mongoose.Types.ObjectId(stackId);
            const questionData = {
                stackId: objectId,
                question,
                options,
                correctAnswer
            };
            const createdQuestion = await this.createQuestionUseCase.execute(questionData);
            return res.status(HttpStatus.CREATED).json(createdQuestion)
        } catch (error) {
            next(error)
        }
    }
}