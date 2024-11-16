import { Notification } from "../../domain/entities/notfication.entity";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { IFetchNotificationsUseCase } from "../interfaces/IFetchNotificationsUseCase";


export class FetchNotificationsUseCase implements IFetchNotificationsUseCase {
    constructor(private notificationRepositary: INotificationRepo) { }

    async execute(userId: string, limit: number, skip: number): Promise<Notification[]> {
        const notifications = await this.notificationRepositary.fetchByUserId(userId, limit, skip);
        return notifications;
    }
}