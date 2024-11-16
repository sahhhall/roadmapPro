import { IGetTotalRevenueUseCase } from "../../application/interfaces/IGetTotalRevenueUseCase";
import { IHandlePaymentWebhookUseCase } from "../../application/interfaces/IHandlePaymentWebhookUseCase";
import { GetTotalRevenueUseCase } from "../../application/usecases/GetTotalRevenueUseCase";
import { HandlePaymentWebhookUseCase } from "../../application/usecases/HandlePaymentWebhookUseCase";
import { IPaymentRepositary } from "../../domain/interfaces/IPayment";
import { PaymentRepositary } from "../repositories/PaymentReposirary";


export class DIContainer {
    private static instance: DIContainer;
    private _paymentRepositary: IPaymentRepositary;
    private constructor() {
        this._paymentRepositary = new PaymentRepositary;
    }
    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer()
        }
        return DIContainer.instance;
    };


    public getHandlePaymentwbHookUseCase(): IHandlePaymentWebhookUseCase {
        return new HandlePaymentWebhookUseCase(this._paymentRepositary);
    }

    public getTotalRevenue(): IGetTotalRevenueUseCase {
        return new GetTotalRevenueUseCase(this._paymentRepositary)
    }
}