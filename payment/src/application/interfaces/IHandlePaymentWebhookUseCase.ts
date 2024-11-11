import Stripe from "stripe";


export interface IHandlePaymentWebhookUseCase {
    execute(event: Stripe.Event): Promise<void>;
}