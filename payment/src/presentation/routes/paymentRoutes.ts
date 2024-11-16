import { Router } from "express";
import express from 'express'
import { PaymentController } from "../controllers/PaymentController";
import { HandlePaymentWebhookController } from "../controllers/PaymentWebhookController";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { GetTotalRevenueUseCase } from "../../application/usecases/GetTotalRevenueUseCase";
import { GetAnalyticsController } from "../controllers/GetAnalyticsController";

const diContainer = DIContainer.getInstance();
const router = Router();
const paymentController = new PaymentController();
const webhookController = new HandlePaymentWebhookController(diContainer.getHandlePaymentwbHookUseCase());

const getTotalRevenueController = new GetAnalyticsController(diContainer.getTotalRevenue());


router.post('/create', express.json(), async (req, res, next) => {
    await paymentController.create(req, res, next);
});


router.post('/webhook',
    express.raw({ type: 'application/json' }),
    async (req, res, next) => {
        await webhookController.handle(req, res, next)
    }
);

router.get('/total-revenue', express.json(), async (req, res, next) => {
    await getTotalRevenueController.get(req, res, next);
})

export { router as paymentRoutes };