import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateRequest } from "@sahhhallroadmappro/common";
import { GetRequestedRoadmapsController, RoadMapReviewController } from "../controllers";
import { ReviewRoadmapDTO } from "../dto/ReviewRoadmapDTO";





const router = Router();
const diContainer = DIContainer.getInstance();

const getRequestedRoadmapController = new GetRequestedRoadmapsController(diContainer.getAllDraftedRoadmaps());
const reviewRoadmapController = new RoadMapReviewController(diContainer.getReviewRoadMapUseCase());

router.get('', async (req, res, next) => {
    await getRequestedRoadmapController.requestedRoadmaps(req, res, next);
});


router.post('/review', validateRequest(ReviewRoadmapDTO), async (req, res, next) => {
    await reviewRoadmapController.reviewRoadmap(req, res, next);
})



export { router as adminRoutes };