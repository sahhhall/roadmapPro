import { ICreateNotificationUseCase } from "../../application/interfaces/ICreateNotificationUseCase";
import { IFetchNotificationsUseCase } from "../../application/interfaces/IFetchNotificationsUseCase";
import { IGetNotificationCount } from "../../application/interfaces/IGetNotificationCount";
import { CreateNotificationUseCase } from "../../application/usecases/CreateNotificationUseCase";
import { FetchNotificationsUseCase } from "../../application/usecases/FetchNotificationsUseCase";
import { GetNotificationCountUseCase } from "../../application/usecases/GetNotificationCountUseCase";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { INotificationRepo } from "../../domain/interfaces/INotificationRepositary";
import { NotificationRepositary } from "../repositories/NotificationRepositary";
import { NodeMailerService } from "../services/NodeMailer";


export class DIContainer {
    private static instance: DIContainer;
    private _nodeMailerService: IEmailService;
    private _notificatioRepositary: INotificationRepo;
    private constructor() {
        this._nodeMailerService = new NodeMailerService()
        this._notificatioRepositary = new NotificationRepositary();
    }

    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    };

    public createNotificationUseCase(): ICreateNotificationUseCase {
        return new CreateNotificationUseCase(this._notificatioRepositary, this._nodeMailerService)
    }

    public getNotifications(): IFetchNotificationsUseCase {
        return new FetchNotificationsUseCase(this._notificatioRepositary)
    }

    public getNotificationCount(): IGetNotificationCount {
        return new GetNotificationCountUseCase(this._notificatioRepositary);
    }
}