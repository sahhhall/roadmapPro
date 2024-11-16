import { NotFoundError } from "@sahhhallroadmappro/common";
import { Notification } from "../../domain/entities/notfication.entity";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { IUpdateReadStatusUseCase } from "../interfaces/IUpdateReadStatusUseCase";


export class UpdateReadStatusUseCase implements IUpdateReadStatusUseCase {
    constructor(private notificationRepositary: INotificationRepo) { }

    async execute(notificationId: string): Promise<Notification> {
        const updatedNotification = await this.notificationRepositary.updateIsRead(notificationId);
        if (!updatedNotification) {
            throw new NotFoundError();
        };
        return updatedNotification
    }
}