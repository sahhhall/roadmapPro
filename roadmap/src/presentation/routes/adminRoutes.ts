import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateRequest } from "@sahhhallroadmappro/common";
import { GetRequestedRoadmapsController, RoadMapReviewController } from "../controllers";
import { ReviewRoadmapDTO } from "../dto/ReviewRoadmapDTO";
import { ActivityChangeController } from "../controllers/admin/ActivityChangeController";





const router = Router();
const diContainer = DIContainer.getInstance();

const getRequestedRoadmapController = new GetRequestedRoadmapsController(diContainer.getAllDraftedRoadmaps());
const reviewRoadmapController = new RoadMapReviewController(diContainer.getReviewRoadMapUseCase());
const activeChangeController = new ActivityChangeController(diContainer.roadmapActiveChnage());



router.get('', async (req, res, next) => {
    await getRequestedRoadmapController.requestedRoadmaps(req, res, next);
});


router.post('/review', validateRequest(ReviewRoadmapDTO), async (req, res, next) => {
    await reviewRoadmapController.reviewRoadmap(req, res, next);
})

router.put('/list-unlist', async (req, res, next) => {
    await activeChangeController.changeActive(req, res, next);
})




export { router as adminRoutes };