export interface IDeleteQuestionUseCase {
    execute(id: string): Promise<boolean>;
}