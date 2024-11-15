
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { GetAnalyticsController } from "../controllers/admin/GetAnalyticsController";



const router = Router()
const diContainer = DIContainer.getInstance()

const getBookingAnalytics = new GetAnalyticsController(diContainer.getAnalyticsBylast30())

router.get('/', async (req, res, next) => {
    await getBookingAnalytics.get(req, res, next);
})

export { router as bookingAnalyticsRoutes }