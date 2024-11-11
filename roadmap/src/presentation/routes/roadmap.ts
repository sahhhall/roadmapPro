import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { validateRequest } from "@sahhhallroadmappro/common";
import { CreateNodeDTO, CreateRoadMapDTO } from "../dto";
import { AllRoadMapController, CreateRoadMap, GetNodeDetailsController, GetRequestedRoadmapsController, GetRoadMapController, NodeController, RoadMapSaveController } from "../controllers";
import { PublishRoadmapController } from "../controllers/PublishedRoadmapController";
import { GetAllRoadmapByUserController } from "../controllers/GetAllRoadmapByUserController";


const router = Router();
const diContainer = DIContainer.getInstance();

const createRoadMapController = new CreateRoadMap(diContainer.getCreateRoadMapUseCase());
const createNodeController = new NodeController(diContainer.getCreateNodeCreateUseCase());
const getAllRoadMapController = new AllRoadMapController(diContainer.getAllRoadMapUseCase());
const getRoadMapController = new GetRoadMapController(diContainer.getRoadMapUseCases());
const getSaveRoadmapController = new RoadMapSaveController(diContainer.getSaveRoadmapUseCase());
const getNodeDetailsByNodeIdController = new GetNodeDetailsController(diContainer.getNodeDetailsUseCase());
const publishRoadmapsController = new PublishRoadmapController(diContainer.getAllListedRoadmaps());
const getRoadmapsByUser = new GetAllRoadmapByUserController(diContainer.fetchUserRoadmaps())

//admin

const getRequestedRoadmapController = new GetRequestedRoadmapsController(diContainer.getAllDraftedRoadmaps());




//admin 

// router.get('/drafted', async (req, res, next) => {
//     await getRequestedRoadmapController.requestedRoadmaps(req, res, next)
// });




//


router.get('/', async (req, res, next) => {
    await getAllRoadMapController.execute(req, res, next);
})

router.get('/published', async (req, res, next) => {
    await publishRoadmapsController.execute(req, res, next);
});

router.post('/', validateRequest(CreateRoadMapDTO), async (req, res, next) => {
    await createRoadMapController.createRoadMap(req, res, next)
});

router.post('/node', validateRequest(CreateNodeDTO), async (req, res, next) => {
    await createNodeController.createNode(req, res, next);
});



router.post('/publish', async (req, res, next) => {
    await getSaveRoadmapController.saveRoadmap(req, res, next)
})

router.get('/nodedetails/:nodeId', async (req, res, next) => {
    console.log("am hre node detailss")
    await getNodeDetailsByNodeIdController.getNodeDetails(req, res, next);
})

router.get('/profile/:userId', async (req, res, next) => {
    await getRoadmapsByUser.get(req, res, next)
})

router.get('/:roadmapId', async (req, res, next) => {
    console.log("am hre roadma")
    await getRoadMapController.getRoadMap(req, res, next);
})



export { router };