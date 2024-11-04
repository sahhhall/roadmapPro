
import { Router } from "express";
import { UpdateSlotAvailbilityController } from "../controllers/mentor/UpdateSlotAvailbilityController";
import { DIContainer } from "../../infrastructure/di/DIContainer";



const router = Router()
const diContainer = DIContainer.getInstance()


const slotAvailbilityUpdationController = new UpdateSlotAvailbilityController(diContainer.updateSlotAvailabilityUseCase());


router.put('/',async (req,res,next)=> {
    await slotAvailbilityUpdationController.updateSlot(req,res,next)
})

export { router as availabilityRoutes }