import { Router } from 'express';
import { SignUpController } from '../controllers/auth/SignUpController';
import { LoginController } from '../controllers/auth/LoginUserController';
import { LogoutController } from '../controllers/auth/LogoutUserController';
import { OtpVerifyController } from '../controllers/auth/VerifyUserController';
import { ResendOtpController } from '../controllers/auth/ResendOTPController';
import { CreateUserDto, GoogleLoginDto } from '../dto';
import { validateRequest } from '@sahhhallroadmappro/common'
import { GoogleLoginController } from '../controllers/auth/GoogleLoginController';

const router = Router();
const signUpController = new SignUpController();
const loginController = new LoginController()
const logoutController = new LogoutController();
const verifyController = new OtpVerifyController();
const resendController = new ResendOtpController();
const googleLoginControler = new GoogleLoginController()
router.post('/', validateRequest(CreateUserDto), async (req, res, next) => { await signUpController.signup(req, res, next) });
router.post('/login', async (req, res) => { await loginController.login(req, res) });
router.post('/logout', async (req, res) => { await logoutController.logout(req, res) })
router.post('/verify-otp', async (req, res) => { await verifyController.verify(req, res) });
router.post('/resent-otp', async (req, res) => { await resendController.resendOtp(req, res) });
router.post('/google-login', validateRequest(GoogleLoginDto), async (req, res) => { await googleLoginControler.login(req, res) })
export { router as authRoutes };