
import { Test } from "../../../domain/entities/Assessment";

export interface ICreateTestUseCase {
    execute(testData: Omit<Test, 'questions' | 'duration' | 'score' | 'status'>): Promise<Test | null>;
}