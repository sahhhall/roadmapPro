import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateRequest } from "@sahhhallroadmappro/common";
import { CreateNodeDTO, CreateRoadMapDTO } from "../dto";
import { CreateRoadMap, NodeController } from "../controllers";
import { ReviewRoadmapDTO } from "../dto/ReviewRoadmapDTO";
import { RoadMapReviewController } from "../controllers/admin/ReviewRoadmapController";
import { AllRoadMapController } from "../controllers/AllRoadMapController";


const router = Router();
const diContainer = DIContainer.getInstance();

const createRoadMapController = new CreateRoadMap(diContainer.getCreateRoadMapUseCase());
const createNodeController = new NodeController(diContainer.getCreateNodeCreateUseCase());
const reviewRoadmapController = new RoadMapReviewController(diContainer.getReviewRoadMapUseCase());
const getAllRoadMapController = new AllRoadMapController(diContainer.getAllRoadMapUseCase());

router.get('/', async (req, res, next) => {
    await getAllRoadMapController.execute(req, res, next);
})

router.post('/', validateRequest(CreateRoadMapDTO), async (req, res, next) => {
    await createRoadMapController.createRoadMap(req, res, next)
});

router.post('/node', validateRequest(CreateNodeDTO), async (req, res, next) => {
    await createNodeController.createNode(req, res, next);
});


router.post('/review', validateRequest(ReviewRoadmapDTO), async (req, res, next) => {
    await reviewRoadmapController.reviewRoadmap(req, res, next);
})

export { router };