
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { CreateBookingController } from "../controllers/user/CreateBookingController";
import { validateRequest } from "@sahhhallroadmappro/common";
import { CreateBookingDTO } from "../dto/CreateBookingDTO";

const router = Router()
const diContainer = DIContainer.getInstance()



const createBookingController = new CreateBookingController(diContainer.createBookingUseCase());

router.post('/', validateRequest(CreateBookingDTO), async (req, res, next) => {
    await createBookingController.create(req, res, next)
})



export { router as bookingRoutes }