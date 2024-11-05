

import { Router } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { GetMentorsBySkillController } from "../../controllers/mentor/GetMentorsBySkillController";
import { GetMentorAllDetailsController } from "../../controllers/mentor/GetMentorAllDetailsController";



const router = Router()

const diContainer = DIContainer.getInstance();


const getMentorsBySkill = new GetMentorsBySkillController(diContainer.getMentorsBySkillUseCase())
const getMentorDetailsById = new GetMentorAllDetailsController(diContainer.getMentorByIdUseCase())

router.get('/:skill', async (req, res, next) => {
    await getMentorsBySkill.getMentors(req, res, next)
})

router.get('/details/:mentorId', async (req, res, next) => {
    await getMentorDetailsById.mentorDetails(req, res, next)
})

export { router as mentorRoutes }