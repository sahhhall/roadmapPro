import { validateRequest } from "@sahhhallroadmappro/common";
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { EvaluateTestController, GetQuestionController, InitialTestController } from "../controllers/user";
import { CreateInitialTestDTO, UserSubmissionDTO } from "../dto";
import { GetAllStacksController } from "../controllers/admin/GetAllStacksController";






const router = Router()
const diContainer = DIContainer.getInstance();

const createInitialTest = new InitialTestController(diContainer.createTestUseCase());
const valuationTest = new EvaluateTestController(diContainer.valuateTestUseCase());
const getQuestionForAssessment = new GetQuestionController(diContainer.getQuestionUseCase());
const GetStacksController = new GetAllStacksController(diContainer.getAllStacksUseCase());


router.get('/', async (req, res, next) => {
    await GetStacksController.getStacks(req, res, next)
})


router.post('/tests', validateRequest(CreateInitialTestDTO), async (req, res, next) => {
    await createInitialTest.createStack(req, res, next)
})


router.post('/tests/submit', validateRequest(UserSubmissionDTO), async (req, res, next) => {
    await valuationTest.valuateTest(req, res, next);
})

router.get('/tests/:questionId', async (req, res, next) => {
    await getQuestionForAssessment.getQuestion(req, res, next)
})





export { router as userRoutes }