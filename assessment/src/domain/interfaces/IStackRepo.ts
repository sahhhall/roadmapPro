import { Stack } from "../entities/Assessment";

export interface IStackRepo {
    createStack(stack: Stack): Promise<Stack>;
    findStackById(id: string): Promise<Stack | null>;
    findAllStacks(): Promise<Stack[]>;
    updateStack(id: string, name: string): Promise<Stack | null>;
    deleteStack(id: string): Promise<boolean>;
}
