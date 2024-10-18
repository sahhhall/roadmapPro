import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateRequest } from "@sahhhallroadmappro/common";
import { GetRequestedRoadmapsController } from "../controllers";





const router = Router();
const diContainer = DIContainer.getInstance();

const getRequestedRoadmapController = new GetRequestedRoadmapsController(diContainer.getAllDraftedRoadmaps());


router.get('/', async (req, res, next) => {
    await getRequestedRoadmapController.requestedRoadmaps(req, res, next);
});





export { router as adminRoutes };