import { NextFunction, Request, Response } from "express";
import { IHandlePaymentWebhookUseCase } from "../../application/interfaces/IHandlePaymentWebhookUseCase";
import { BadRequestError, HttpStatus } from "@sahhhallroadmappro/common";
import Stripe from "stripe";
import { customLogger } from "../middleware/loggerMiddleware";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as any, {
    apiVersion: '2024-10-28.acacia'
});

export class HandlePaymentWebhookController {
    constructor(private readonly handlePaymentWebhookUseCase: IHandlePaymentWebhookUseCase) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        const signature = req.headers['stripe-signature'];
        const enpointSeceret = process.env.STRIPE_WEBHOOK_SECRET as string;
        try {
            if (!signature) {
                throw new BadRequestError('missing stripe signature')
            }
            const event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                enpointSeceret!
            );

            customLogger.debug(`Processing webhook: ${event.type}`, {
                paymentIntentId: (event.data.object as any).id,
                eventType: event.type
            });

            await this.handlePaymentWebhookUseCase.execute(event);
            res.status(HttpStatus.CREATED).json({ recived: true })
        } catch (error) {
            next(error)
        }
    }
}