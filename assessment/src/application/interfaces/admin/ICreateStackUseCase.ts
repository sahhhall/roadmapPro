
import { Stack } from "../../../domain/entities/Assessment";

export interface ICreateStackUseCase {
    execute(name: string): Promise<Stack | null>;
}