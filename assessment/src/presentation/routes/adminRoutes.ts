import { validateRequest } from "@sahhhallroadmappro/common";
import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { CreateStackController } from "../controllers/admin/index";
import { CreateQuestionDTO, CreateStackDTO } from '../dto/index'
import { GetAllStacksController } from "../controllers/admin/GetAllStacksController";
import { DeleteStackController } from "../controllers/admin/DeleteStackController";
import { CreateQuestionController } from "../controllers/admin/CreateQuestionController";
import { DeleteQuestionController } from "../controllers/admin/DeleteQuestionController";


const router = Router()
const diContainer = DIContainer.getInstance();


const createStackController = new CreateStackController(diContainer.getCreateUseCase());
const GetStacksController = new GetAllStacksController(diContainer.getAllStacksUseCase());
const deleteStackController = new DeleteStackController(diContainer.deleteStackUseCase());


//question
const createQuestionController = new CreateQuestionController(diContainer.createQuestionUseCase());
const deleteQuestionController = new DeleteQuestionController(diContainer.deleteQuestionUseCase())

router.post('/', validateRequest(CreateStackDTO), async (req, res, next) => {
    await createStackController.createStack(req, res, next)
})

router.get('/', async (req, res, next) => {
    await GetStacksController.getStacks(req, res, next)
})

router.delete('/', async (req, res, next) => {
    await deleteStackController.delete(req, res, next);
})


router.post('/questions', validateRequest(CreateQuestionDTO),async (req,res,next)=> {
    await createQuestionController.createQuestion(req,res,next)
})
router.delete('/question', async(req,res,next)=> {
    await deleteQuestionController.delete(req,res,next)
})
export { router as adminRoutes }