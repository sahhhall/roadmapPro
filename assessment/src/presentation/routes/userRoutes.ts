import { validateRequest } from "@sahhhallroadmappro/common";
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { InitialTestController } from "../controllers/user";
import { CreateInitialTestDTO } from "../dto";





const router = Router()
const diContainer = DIContainer.getInstance();

const createInitialTest = new InitialTestController(diContainer.createTestUseCase());



router.post('/tests', validateRequest(CreateInitialTestDTO),async (req, res, next) => {
    await createInitialTest.createStack(req, res, next)
})






export { router as userRoutes }