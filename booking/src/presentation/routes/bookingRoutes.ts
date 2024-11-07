
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { CreateBookingController } from "../controllers/user/CreateBookingController";
import { validateRequest } from "@sahhhallroadmappro/common";
import { CreateBookingDTO } from "../dto/CreateBookingDTO";
import { GetMentorAllBookingContoller } from "../controllers/mentor/GetMentorAllBookingContoller";

const router = Router()
const diContainer = DIContainer.getInstance()



const createBookingController = new CreateBookingController(diContainer.createBookingUseCase());
const getAllBookingByMentor = new GetMentorAllBookingContoller(diContainer.getAllBookingByMentorId());
router.post('/', validateRequest(CreateBookingDTO), async (req, res, next) => {
    await createBookingController.create(req, res, next)
})

router.get('/:mentorId', async (req, res, next) => {
    await getAllBookingByMentor.getBookings(req, res, next)
})

export { router as bookingRoutes }