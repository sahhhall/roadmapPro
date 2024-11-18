
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { GetUserNotificationByemailController } from "../controllers/GetNotificationByUserIdController";
import { GetNotificationCount } from "../controllers/GetNotificationCount";



const router = Router()

const diContainer = DIContainer.getInstance();


const getUserNotificationByemailController = new GetUserNotificationByemailController(diContainer.getNotifications())
const getUserNotificationCount = new GetNotificationCount(diContainer.getNotificationCount());

router.get('/notification-count/:mail', async (req, res, next) => {
    await getUserNotificationCount.get(req, res, next)
})
router.get('/:mail', async (req, res, next) => {
    await getUserNotificationByemailController.get(req, res, next)
})



export { router as notificationRoutes }