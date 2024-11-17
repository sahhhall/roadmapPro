export interface INotificationResponse {
    userMail: string,
    type: string,
    message: string,
    isRead: boolean,
    createdAt: string,
    updatedAt: Date,
    id: string
}