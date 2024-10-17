import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateRequest } from "@sahhhallroadmappro/common";
import { CreateNodeDTO, CreateRoadMapDTO, GetNodeDetailsDTO } from "../dto";
import { AllRoadMapController, CreateRoadMap, GetNodeDetailsController, GetRoadMapController, NodeController, RoadMapSaveController } from "../controllers";
import { ReviewRoadmapDTO } from "../dto/ReviewRoadmapDTO";
import { RoadMapReviewController } from "../controllers/admin/ReviewRoadmapController";


const router = Router();
const diContainer = DIContainer.getInstance();

const createRoadMapController = new CreateRoadMap(diContainer.getCreateRoadMapUseCase());
const createNodeController = new NodeController(diContainer.getCreateNodeCreateUseCase());
const reviewRoadmapController = new RoadMapReviewController(diContainer.getReviewRoadMapUseCase());
const getAllRoadMapController = new AllRoadMapController(diContainer.getAllRoadMapUseCase());
const getRoadMapController = new GetRoadMapController(diContainer.getRoadMapUseCases());
const getSaveRoadmapController = new RoadMapSaveController(diContainer.getSaveRoadmapUseCase());
const getNodeDetailsByNodeIdController = new GetNodeDetailsController(diContainer.getNodeDetailsUseCase());
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

router.post('/publish', async (req, res, next) => {
    await getSaveRoadmapController.saveRoadmap(req, res, next)
})

router.get('/nodedetails', validateRequest(GetNodeDetailsDTO), async (req, res, next) => {
    console.log("am hre node detailss")
    await getNodeDetailsByNodeIdController.getNodeDetails(req, res, next);
})

router.get('/:roadmapId', async (req, res, next) => {
    console.log("am hre roadma")
    await getRoadMapController.getRoadMap(req, res, next);
})

export { router };