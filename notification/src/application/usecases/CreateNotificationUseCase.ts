import { Notification } from "../../domain/entities/notfication.entity";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { ICreateNotificationUseCase } from "../interfaces/ICreateNotificationUseCase";


export class CreateNotificationUseCase implements ICreateNotificationUseCase {
    constructor(private notificationRepositary: INotificationRepo, private emailService: IEmailService) { }

    async execute(attrs: Notification): Promise<Notification> {
        const notfication = await this.notificationRepositary.create(attrs);
        const subject = `${attrs.type} update🚀!! `
        await this.emailService.sendMail(attrs.userMail, subject, attrs.message);
        return notfication
    }
}