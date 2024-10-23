
import { Test } from "../../../domain/entities/Assessment";

export interface IEvaluateTestUseCase {
    execute(submittedData: Pick<Test,'questions'|'id'>): Promise<Test | null>;
}