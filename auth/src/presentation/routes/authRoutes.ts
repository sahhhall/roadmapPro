import { Router } from 'express';
import { SignUpController } from '../controllers/auth/SignUpController';
import { LoginController } from '../controllers/auth/LoginUserController';
import { LogoutController } from '../controllers/auth/LogoutUserController';
import { OtpVerifyController } from '../controllers/auth/VerifyUserController';
import { ResendOtpController } from '../controllers/auth/ResendOTPController';
import { CreateUserDto, ForgotPasswordDTO, GoogleLoginDto } from '../dto';
import { validateRequest } from '@sahhhallroadmappro/common'
import { GoogleLoginController } from '../controllers/auth/GoogleLoginController';
import { PasswordResetController } from '../controllers/auth/PasswordResetController';

const router = Router();
const signUpController = new SignUpController();
const loginController = new LoginController()
const logoutController = new LogoutController();
const verifyController = new OtpVerifyController();
const resendController = new ResendOtpController();
const googleLoginControler = new GoogleLoginController()
const resetPasswordController = new PasswordResetController();
router.post('/', validateRequest(CreateUserDto), async (req, res, next) => { await signUpController.signup(req, res, next) });
router.post('/login', async (req, res, next) => { await loginController.login(req, res, next) });
router.post('/logout', async (req, res) => { await logoutController.logout(req, res) })
router.post('/verify-otp', async (req, res) => { await verifyController.verify(req, res) });
router.post('/resent-otp', async (req, res) => { await resendController.resendOtp(req, res) });
router.post('/google-login', validateRequest(GoogleLoginDto), async (req, res) => { await googleLoginControler.login(req, res) })
router.post('/forgot-password', validateRequest(ForgotPasswordDTO), async (req, res, next) => { await resetPasswordController.reset(req, res, next) })
export { router as authRoutes };