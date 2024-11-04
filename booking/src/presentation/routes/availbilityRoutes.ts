
import { Router } from "express";
import { UpdateSlotAvailbilityController } from "../controllers/mentor/UpdateSlotAvailbilityController";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { UpdatePriceController } from "../controllers/mentor/UpdatePriceController";
import { validateRequest } from "@sahhhallroadmappro/common";
import { PriceUpdateDTO } from "../dto/PriceUpdateDTO";


const router = Router()
const diContainer = DIContainer.getInstance()


const slotAvailbilityUpdationController = new UpdateSlotAvailbilityController(diContainer.updateSlotAvailabilityUseCase());
const priceUpdateController = new UpdatePriceController(diContainer.priceUpdateUseCase());


router.put('/', async (req, res, next) => {
    await slotAvailbilityUpdationController.updateSlot(req, res, next)
})

router.put('/price', validateRequest(PriceUpdateDTO), async (req, res, next) => {
    await priceUpdateController.updatePrice(req, res, next);
});
export { router as availabilityRoutes }