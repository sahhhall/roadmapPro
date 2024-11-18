
export interface IGetNotificationCount {
    execute(userMail: string): Promise<{ notificationCount: number } | null>;
}