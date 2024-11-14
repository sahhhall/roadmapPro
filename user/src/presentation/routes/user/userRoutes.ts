
import { Router } from "express";
import { GetUserDetailsController } from "../../controllers/user/GetUserDetailsController";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { upload } from "../../middleware/multer";
import { UpdateUserProfileController } from "../../controllers/user/UpdateUserProfileController";



const router = Router()

const diContainer = DIContainer.getInstance();


const getUserDetailsController = new GetUserDetailsController(diContainer.getUserDetailsUseCase());
const updateUserProfileController = new UpdateUserProfileController();


router.put('/update', upload.single('avatar'), async (req, res, next) => {
    await updateUserProfileController.update(req, res, next)
})

router.get('/:userId', async (req, res, next) => {
    await getUserDetailsController.getUser(req, res, next);
})



export { router as userRoutes }