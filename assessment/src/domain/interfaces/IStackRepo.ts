import { Stack } from "../entities/Assessment";

export interface IStackRepo {
    createStack(name: string): Promise<Stack>;
    findStackById(id: string): Promise<Stack | null>;
    findStackByName(name: string): Promise<Stack | null>;
    findAllStacks(): Promise<Stack[]>;
    updateStack(id: string, name: string): Promise<Stack | null>;
    deleteStack(id: string): Promise<boolean>;
}
