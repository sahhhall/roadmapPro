import { Notification } from "../entities/notfication.entity";

export interface INotificationRepo {
    /**
     * Fetches all notifications for a specific user by user ID.
     * @param userId - The ID of the user whose notifications should be fetched.
     * @returns A promise that resolves to an array of notifications.
     */
    fetchByUserId(userId: string): Promise<Notification[]>;

    /**
     * Creates a new notification.
     * @param notification - The notification entity to be created.
     * @returns A promise that resolves to the created notification.
     */
    create(notification: Partial<Notification>): Promise<Notification>;


    /**
 * Updates the `isRead` status of a notification.
 * @param notificationId - The ID of the notification to update.
 * @returns A promise resolving to the updated notification.
 */

    updateIsRead(notificationId: string): Promise<Notification | null>;
}
