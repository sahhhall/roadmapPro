import { Stack } from "../../domain/entities/Assessment";
import { Stack as StackDB } from "../database/mongodb/schemas/stack.schema";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { IStackRepo } from "../../domain/interfaces/IStackRepo";

export class StackRepository implements IStackRepo{
    async createStack(stack: Stack): Promise<Stack> {
        try {
            const createdStack = StackDB.build({ name: stack.name });
            await createdStack.save();
            return createdStack;
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: create stack - ${error.message}`);
        }
    }

    async findStackById(id: string): Promise<Stack | null> {
        try {
            return await StackDB.findById(id);
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: find stack - ${error.message}`);
        }
    }

    async findAllStacks(): Promise<Stack[]> {
        try {
            return await StackDB.find();
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: find all stacks - ${error.message}`);
        }
    }

    async updateStack(id: string, name: string): Promise<Stack | null> {
        try {
            return await StackDB.findByIdAndUpdate(id, { name }, { new: true });
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: update stack - ${error.message}`);
        }
    }

    async deleteStack(id: string): Promise<boolean> {
        try {
            await StackDB.findByIdAndDelete(id);
            return true;
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: delete stack - ${error.message}`);
        }
    }
}
