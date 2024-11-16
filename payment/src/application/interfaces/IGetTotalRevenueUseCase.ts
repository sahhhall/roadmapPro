import Stripe from "stripe";


export interface IGetTotalRevenueUseCase {
    execute(): Promise<number | undefined>;
}