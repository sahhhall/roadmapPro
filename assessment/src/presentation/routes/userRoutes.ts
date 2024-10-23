import { validateRequest } from "@sahhhallroadmappro/common";
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { EvaluateTestController, InitialTestController } from "../controllers/user";
import { CreateInitialTestDTO, UserSubmissionDTO } from "../dto";





const router = Router()
const diContainer = DIContainer.getInstance();

const createInitialTest = new InitialTestController(diContainer.createTestUseCase());
const valuationTest = new EvaluateTestController(diContainer.valuateTestUseCase());


router.post('/tests', validateRequest(CreateInitialTestDTO), async (req, res, next) => {
    await createInitialTest.createStack(req, res, next)
})


router.post('/tests/submit', validateRequest(UserSubmissionDTO), async (req, res, next) => {
    await valuationTest.valuateTest(req, res, next);
})






export { router as userRoutes }