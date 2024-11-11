import Stripe from "stripe";
import { IPaymentRepositary } from "../../domain/interfaces/IPayment";
import { IHandlePaymentWebhookUseCase } from "../interfaces/IHandlePaymentWebhookUseCase";
import { PaymentStatus } from "../../domain/entities/PaymentEntity";
import { customLogger } from "../../presentation/middleware/loggerMiddleware";
import { PayementCreateProducer } from "../../infrastructure/kafka/producers/payment-completed-producer";
import kafkaWrapper from "../../infrastructure/kafka/kafka-wrapper";




export class HandlePaymentWebhookUseCase implements IHandlePaymentWebhookUseCase {
    constructor(private readonly paymentRepositary: IPaymentRepositary) { }

    async execute(event: Stripe.Event): Promise<void> {
        const session = event.data.object as Stripe.Checkout.Session;
        const { metadata, created, id: paymentIntentId } = session;
        const transactionDate = new Date(created * 1000);
        console.log("meta in payment:", metadata);

        const { userId, bookingId, mentorId } = metadata as any;

        switch (event.type) {
            case 'checkout.session.completed':
                customLogger.info(`paumentIntent for ${session.amount_total} was successful!`);
                await this.paymentRepositary.createPayment({
                    userId,
                    mentorId,
                    amount: session.amount_total ? session.amount_total / 100 : 0,
                    status: PaymentStatus.COMPLETED,
                    paymentId: paymentIntentId,
                    bookingId,
                    transactionDate
                });


                //kafka wil rule here ;)))))
                // this for after payment compmleteion we have to mark 
                // booking documnet as 
                await new PayementCreateProducer(kafkaWrapper.producer).produce({
                    bookingId: bookingId
                })
                break;

            case 'payment_intent.payment_failed':
                await this.paymentRepositary.createPayment({
                    userId,
                    mentorId,
                    amount: session.amount_total ? session.amount_total / 100 : 0,
                    status: PaymentStatus.FAILED,
                    paymentId: paymentIntentId,
                    bookingId,
                    transactionDate
                });
                break;
        }
    }
}