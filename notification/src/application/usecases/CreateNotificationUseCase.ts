import { Notification } from "../../domain/entities/notfication.entity";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { ICreateNotificationUseCase } from "../interfaces/ICreateNotificationUseCase";


export class CreateNotificationUseCase implements ICreateNotificationUseCase {
    constructor(private notificationRepositary: INotificationRepo) { }

    async execute(attrs: Notification): Promise<Notification> {
        const notfication = await this.notificationRepositary.create(attrs);
        return notfication
    }
}