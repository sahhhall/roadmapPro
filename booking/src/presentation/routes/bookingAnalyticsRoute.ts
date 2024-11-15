
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { GetAnalyticsController } from "../controllers/admin/GetAnalyticsController";
import { GetBookingsCountAndUser } from "../controllers/admin/GetBookingsCountAndUser";



const router = Router()
const diContainer = DIContainer.getInstance()

const getBookingAnalytics = new GetAnalyticsController(diContainer.getAnalyticsBylast30())
const totalcountOfbookingAndUser = new GetBookingsCountAndUser(diContainer.getCountForAnalytics())
router.get('/', async (req, res, next) => {
    await getBookingAnalytics.get(req, res, next);
})
router.get('/total', async (req, res, next) => {
    await totalcountOfbookingAndUser.get(req, res, next)
})

export { router as bookingAnalyticsRoutes }