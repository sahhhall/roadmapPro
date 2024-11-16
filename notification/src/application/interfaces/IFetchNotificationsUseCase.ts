import { Notification } from "../../domain/entities/notfication.entity";

export interface IFetchNotificationsUseCase {
    execute(userMail: string, limit: number, skip: number): Promise<Notification[]>;
}