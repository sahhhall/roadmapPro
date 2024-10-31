
import { Router } from "express";
import { GetUserDetailsController } from "../../controllers/user/GetUserDetailsController";
import { DIContainer } from "../../../infrastructure/di/DIContainer";



const router = Router()

const diContainer = DIContainer.getInstance();


const getUserDetailsController = new GetUserDetailsController(diContainer.getUserDetailsUseCase());

router.get('/:userId', async (req, res, next) => {
    await getUserDetailsController.getUser(req, res, next);
})

export { router as userRoutes }