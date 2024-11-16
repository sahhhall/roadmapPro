import { Notification } from "../../domain/entities/notfication.entity";

export interface IUpdateReadStatusUseCase {
    execute(notificationId: string): Promise<Notification>;
}