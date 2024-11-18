import { Notification } from "../../domain/entities/notfication.entity";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { IGetNotificationCount } from "../interfaces/IGetNotificationCount";


export class GetNotificationCountUseCase implements IGetNotificationCount {
    constructor(private notificationRepositary: INotificationRepo) { }

    async execute(userMail: string): Promise<{ notificationCount: number } | null> {
        const notificationsCount = await this.notificationRepositary.getNotificationCount(userMail);
        return notificationsCount;
    }
}