

import { Router } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { GetMentorsBySkillController } from "../../controllers/mentor/GetMentorsBySkillController";
import { GetMentorAllDetailsController } from "../../controllers/mentor/GetMentorAllDetailsController";
import { updateAdditionalinfoController } from "../../controllers/mentor/UpdateAdditionalInfo";
import { validateRequest } from "@sahhhallroadmappro/common";
import { UpdateMentorDTO } from "../../dto/UpdateMentorDTO";



const router = Router()

const diContainer = DIContainer.getInstance();


const getMentorsBySkill = new GetMentorsBySkillController(diContainer.getMentorsBySkillUseCase())
const getMentorDetailsById = new GetMentorAllDetailsController(diContainer.getMentorByIdUseCase())
const updateProfile = new updateAdditionalinfoController(diContainer.updateMentorDetails())

router.put('/', validateRequest(UpdateMentorDTO), async (req, res, next) => {
    await updateProfile.update(req, res, next)
})

router.get('/:skill', async (req, res, next) => {
    await getMentorsBySkill.getMentors(req, res, next)
})

router.get('/details/:mentorId', async (req, res, next) => {
    await getMentorDetailsById.mentorDetails(req, res, next)
})

export { router as mentorRoutes }