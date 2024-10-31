
import { Test } from "../../../domain/entities/Assessment";

export interface IUpdateTestUseCase {
    execute(test: Partial<Test>): Promise<any | null>;
}