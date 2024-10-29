import { Test } from "../../../domain/entities/Assessment";


export interface IGetAllTestsUseCase {
    execute(status?: string, result?: string ): Promise<Test[] | null>;
  }