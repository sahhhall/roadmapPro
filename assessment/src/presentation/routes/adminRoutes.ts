import { validateRequest } from "@sahhhallroadmappro/common";
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { CreateStackController } from "../controllers/admin/index";
import { CreateStackDTO } from '../dto/index'


const router = Router()
const diContainer = DIContainer.getInstance();


const createStackController = new CreateStackController(diContainer.getCreateUseCase())

router.post('/', validateRequest(CreateStackDTO), async (req, res, next) => {
    await createStackController.createStack(req, res, next)
})



export { router as adminRoutes }