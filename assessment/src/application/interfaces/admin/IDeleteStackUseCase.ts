export interface IDeleteStackUseCase {
    execute(id: string): Promise<boolean>;
}