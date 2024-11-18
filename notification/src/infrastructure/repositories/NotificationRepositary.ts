import { Notification } from "../../domain/entities/notfication.entity";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { Notification as NotificationDB } from "../database/mongodb/schemas/notification.schema";

export class NotificationRepositary implements INotificationRepo {
    /**
     * Fetches notifications for a user, sorted by createdAt in descending order.
     * @param userMail - The ID of the user to fetch notifications for.
     * @returns A promise resolving to an array of notifications.
     */
    async fetchByUserId(userMail: string, limit: number, skip: number): Promise<Notification[]> {
        try {
            const notifications = await NotificationDB.find({ userMail })
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
                ...notification,
                type: notification.type as any
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
   * @param userMail - The mail of the notification to update.
   * @returns A promise resolving to the updated notification.
   */
    async updateIsRead(userMail: string): Promise<Notification[] | any> {
        try {
            const updatedNotifications = await NotificationDB.updateMany(
                { userMail, isRead: false },
                { $set: { isRead: true } },
                { new: true }
            );
            return updatedNotifications
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: update isRead status - ${error.message}`);
        }
    }

    
    /**
  * Retrieves the count of unread notifications for a given user.
  * @param userMail - The email address of the user whose notifications are to be counted.
  * @returns A promise resolving to an object containing the notification count, or `null` if an error occurs.
  * @throws Will throw an error if there is an issue accessing the database.
  */

    async getNotificationCount(userMail: string): Promise<{ notificationCount: number; } | null> {
        try {
            const notificationCount = await NotificationDB.find(
                { userMail, isRead: false },
            ).countDocuments();
            return { notificationCount };
        } catch (error: any) {
            customLogger.error(error.message);
            throw new Error(`DB error: get notificatoinn count - ${error.message}`);
        }
    }

}
