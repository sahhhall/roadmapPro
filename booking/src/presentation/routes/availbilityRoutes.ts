
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateRequest } from "@sahhhallroadmappro/common";
import { PriceUpdateDTO } from "../dto/PriceUpdateDTO";
import { GetAvailableSlotsController, UpdatePriceController, UpdateSlotAvailbilityController } from "../controllers";



const router = Router()
const diContainer = DIContainer.getInstance()


const slotAvailbilityUpdationController = new UpdateSlotAvailbilityController(diContainer.updateSlotAvailabilityUseCase());
const priceUpdateController = new UpdatePriceController(diContainer.priceUpdateUseCase());
const getAvailableSlotsController = new GetAvailableSlotsController(diContainer.getAvailableSlotsUseCase());


router.put('/', async (req, res, next) => {
    await slotAvailbilityUpdationController.updateSlot(req, res, next)
})

router.put('/price', validateRequest(PriceUpdateDTO), async (req, res, next) => {
    await priceUpdateController.updatePrice(req, res, next);
});

router.get('/:mentorId', async (req, res, next) => {
    await getAvailableSlotsController.getSlots(req, res, next);
});
export { router as availabilityRoutes }