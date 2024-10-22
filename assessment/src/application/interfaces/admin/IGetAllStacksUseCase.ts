import { Stack } from "../../../domain/entities/Assessment";


export interface IGetAllStackUseCase {
    execute(): Promise<Stack[] | null>;
}