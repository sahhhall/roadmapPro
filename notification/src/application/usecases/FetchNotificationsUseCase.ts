import { Notification } from "../../domain/entities/notfication.entity";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { IFetchNotificationsUseCase } from "../interfaces/IFetchNotificationsUseCase";


export class FetchNotificationsUseCase implements IFetchNotificationsUseCase {
    constructor(private notificationRepositary: INotificationRepo) { }

    async execute(userMail: string, limit: number, skip: number): Promise<Notification[]> {
        const notifications = await this.notificationRepositary.fetchByUserId(userMail, limit, skip);
        //this for each fetching i want to updated last fetched data
        await this.notificationRepositary.updateIsRead(userMail)
        return notifications;
    }
}