import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';
import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as any, {
    apiVersion: '2024-10-28.acacia'
});

export class PaymentController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { mentorId, price, name, bookingId, userId, bookingDate } = req.body;

            const customer = await stripe.customers.create({
                name: 'sahal',
                address: {
                    "line1": "123 Street Name",
                    "city": "City Name",
                    "country": "AE",
                    "postal_code": "12345"
                },
            });

            const lineItems = [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: name,
                    },
                    unit_amount: Math.round(price * 100)
                },
                quantity: 1
            }];

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${process.env.DOMAIN_BASE_URL}/payment-success`,
                cancel_url: `${process.env.DOMAIN_BASE_URL}/mentor-profile/${mentorId}`,
                client_reference_id: mentorId,
                line_items: lineItems,
                customer: customer.id,
                metadata: {
                    userId: userId.toString(),
                    bookingId: bookingId.toString(),
                    bookingDate: bookingDate.toString(),
                    mentorId: mentorId.toString()
                },
            });
            //meta data should be string

            res.status(HttpStatus.OK).json({ id: session.id });
        } catch (error) {
            console.error("Error in PaymentController:", error);
            next(error);
        }
    }
}
