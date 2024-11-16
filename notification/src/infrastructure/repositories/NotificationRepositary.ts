import { Notification } from "../../domain/entities/notfication.entity";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { Notification as NotificationDB } from "../database/mongodb/schemas/notification.schema";

export class NotificationRepositary implements INotificationRepo {
    /**
     * Fetches notifications for a user, sorted by createdAt in descending order.
     * @param userId - The ID of the user to fetch notifications for.
     * @returns A promise resolving to an array of notifications.
     */
    async fetchByUserId(userId: string, limit: number, skip: number): Promise<Notification[]> {
        try {
            const notifications = await NotificationDB.find({ userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)


            return notifications;
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: fetch notifications - ${error.message}`);
        }
    }

    /**
     * Creates a new notification in the database.
     * @param notification - The notification object to be created.
     * @returns A promise resolving to the created notification.
     */
    async create(notification: Partial<Notification>): Promise<Notification> {
        try {
            const newNotification = new NotificationDB({
                ...notification
            })
            const savedNotification = await newNotification.save();
            return savedNotification
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: create notifications - ${error.message}`);
        }
    }


    /**
   * Updates the `isRead` status of a notification.
   * @param notificationId - The ID of the notification to update.
   * @returns A promise resolving to the updated notification.
   */
    async updateIsRead(notificationId: string): Promise<Notification | null> {
        try {
            const updatedNotification = await NotificationDB.findByIdAndUpdate(
                notificationId,
                { isRead: true },
                { new: true }
            )
            return updatedNotification
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: update isRead status - ${error.message}`);
        }
    }
}
