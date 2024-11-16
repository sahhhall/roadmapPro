
import { IPaymentRepositary } from "../../domain/interfaces/IPayment";

import { IGetTotalRevenueUseCase } from "../interfaces/IGetTotalRevenueUseCase";




export class GetTotalRevenueUseCase implements IGetTotalRevenueUseCase {
    constructor(private readonly paymentRepositary: IPaymentRepositary) { }

    async execute(): Promise<number | undefined> {
        const totalRevenue = await this.paymentRepositary.getTotalRevenue();
        return totalRevenue
    }
}