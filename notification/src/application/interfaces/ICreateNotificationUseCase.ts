
import { Notification } from "../../domain/entities/notfication.entity";

export interface ICreateNotificationUseCase {
    execute(attrs: Notification): Promise<Notification>;
}