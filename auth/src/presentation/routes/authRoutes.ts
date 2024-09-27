import { Router } from 'express';
import { SignUpController } from '../controllers/auth/SIgnUpController';

const router = Router();
const signUpController = new SignUpController();


router.post('/', async (req, res) => { await signUpController.signup(req, res) });



export { router as authRoutes };