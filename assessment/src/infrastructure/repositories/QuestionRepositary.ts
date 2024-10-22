import { Question } from "../../domain/entities/Assessment";
import { Question as QuestionDB } from "../database/mongodb/schemas/question.schema";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { IQuestionRepo } from "../../domain/interfaces/IQuestionRepo";

export class QuestionRepository implements IQuestionRepo {
    async createQuestion(question: Question): Promise<Question> {
        try {
            const createdQuestion = QuestionDB.build(question);
            await createdQuestion.save();
            return createdQuestion;
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: create question - ${error.message}`);
        }
    }

    async findQuestionById(id: string): Promise<Question | null> {
        try {
            return await QuestionDB.findById(id);
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: find question - ${error.message}`);
        }
    }

    async findQuestionsByStackId(stackId: string): Promise<Question[]> {
        try {
            return await QuestionDB.find({ stackId });
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: find questions by stack - ${error.message}`);
        }
    }

    async updateQuestion(id: string, question: Partial<Question>): Promise<Question | null> {
        try {
            return await QuestionDB.findByIdAndUpdate(id, question, { new: true });
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: update question - ${error.message}`);
        }
    }

    async deleteQuestion(id: string): Promise<boolean> {
        try {
            const result = await QuestionDB.findByIdAndDelete(id);
            return !!result;
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: delete question - ${error.message}`);
        }
    }
}
