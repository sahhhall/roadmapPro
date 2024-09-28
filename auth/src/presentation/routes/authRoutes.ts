import { Router } from 'express';
import { SignUpController } from '../controllers/auth/SIgnUpController';
import { LoginController } from '../controllers/auth/LoginController';
import { LogoutController } from '../controllers/auth/LogoutController';
import { OtpVerifyController } from '../controllers/auth/OtpVerifyController';

const router = Router();
const signUpController = new SignUpController();
const loginController = new LoginController()
const logoutController = new LogoutController();
const verifyController = new OtpVerifyController()

router.post('/', async (req, res) => { await signUpController.signup(req, res) });
router.post('/login', async (req, res) => { await loginController.login(req, res) });
router.post('/logout', async (req, res) => { await logoutController.logout(req, res) })
router.post('/verify-otp', async (req, res) => { await verifyController.verify(req, res) });

export { router as authRoutes };