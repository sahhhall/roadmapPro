

import { Router } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { GetMentorsBySkillController } from "../../controllers/mentor/GetMentorsBySkillController";



const router = Router()

const diContainer = DIContainer.getInstance();


const getMentorsBySkill = new GetMentorsBySkillController(diContainer.getMentorsBySkillUseCase())


router.get('/:skill', async (req, res, next) => {
    await getMentorsBySkill.getMentors(req, res, next)
})

export { router as mentorRoutes }