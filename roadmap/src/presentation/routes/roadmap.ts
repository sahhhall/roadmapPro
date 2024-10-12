import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { CreateRoadMap } from "../controllers/CreateRoadMap";
import { validateRequest } from "@sahhhallroadmappro/common";
import { CreateRoadMapDTO } from "../dto";


const router = Router();
const diContainer = DIContainer.getInstance();

const roadMapCreateController = new CreateRoadMap(diContainer.getCreateRoadMapUseCase());



router.post('/', validateRequest(CreateRoadMapDTO), async (req, res, next) => {
    await roadMapCreateController.createRoadMap(req, res, next)
});

export { router };