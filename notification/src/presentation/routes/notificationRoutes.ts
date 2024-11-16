
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { GetUserNotificationByemailController } from "../controllers/GetNotificationByUserIdController";



const router = Router()

const diContainer = DIContainer.getInstance();


const getUserNotificationByemailController = new GetUserNotificationByemailController(diContainer.getNotifications())


router.get('/:mail', async (req, res, next) => {
    await getUserNotificationByemailController.get(req, res, next)
})


export { router as notificationRoutes }