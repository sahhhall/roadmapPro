import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateRequest } from "@sahhhallroadmappro/common";
import { CreateNodeDTO, CreateRoadMapDTO } from "../dto";
import { CreateRoadMap, NodeController } from "../controllers";


const router = Router();
const diContainer = DIContainer.getInstance();

const roadMapCreateController = new CreateRoadMap(diContainer.getCreateRoadMapUseCase());
const nodeCreateController = new NodeController(diContainer.getCreateNodeCreateUseCase());


router.post('/', validateRequest(CreateRoadMapDTO), async (req, res, next) => {
    await roadMapCreateController.createRoadMap(req, res, next)
});

router.post('/node', validateRequest(CreateNodeDTO), async (req, res, next) => {
    await nodeCreateController.createNode(req, res, next);
});

export { router };