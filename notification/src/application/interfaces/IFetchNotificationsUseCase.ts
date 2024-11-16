import { Notification } from "../../domain/entities/notfication.entity";

export interface IFetchNotificationsUseCase {
    execute(userId: string, limit: number, skip: number): Promise<Notification[]>;
}