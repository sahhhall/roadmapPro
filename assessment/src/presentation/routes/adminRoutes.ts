import { validateRequest } from "@sahhhallroadmappro/common";
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { CreateStackController } from "../controllers/admin/index";
import { CreateStackDTO } from '../dto/index'
import { GetAllStacksController } from "../controllers/admin/GetAllStacksController";
import { DeleteStackController } from "../controllers/admin/DeleteStackController";


const router = Router()
const diContainer = DIContainer.getInstance();


const createStackController = new CreateStackController(diContainer.getCreateUseCase());
const GetStacksController = new GetAllStacksController(diContainer.getAllStacksUseCase());
const deleteTaskController = new DeleteStackController(diContainer.deleteStackUseCase());



router.post('/', validateRequest(CreateStackDTO), async (req, res, next) => {
    await createStackController.createStack(req, res, next)
})

router.get('/', async (req, res, next) => {
    await GetStacksController.getStacks(req, res, next)
})

router.delete('', async (req, res, next) => {
    await deleteTaskController.delete(req, res, next);
})

export { router as adminRoutes }