import { Router } from 'express';
import { LoginAdminController } from '../controllers/admin/LoginAdminController';
import { FetchUsersController } from '../controllers/admin/FetchUsersController';
import { adminDataMiddleware, validateRequest } from '@sahhhallroadmappro/common';
import { BlockUserController } from '../controllers/admin/BlockUserController';
import { LogoutAdminController } from '../controllers/admin/LogoutAdminController';
import { LoginUserDto } from '../dto';
import { refreshControllerAdmin } from '../controllers/admin/RefreshTokenAdminController';



const router = Router();
const adminLogin = new LoginAdminController();
const adminLogout = new LogoutAdminController();
const allUsers = new FetchUsersController();
const blockUnblock = new BlockUserController()
router.post('/', validateRequest(LoginUserDto), async (req, res, next) => { await adminLogin.login(req, res, next) });
router.post('/logout', async (req, res) => { await adminLogout.logout(req, res) });
router.get('/users', adminDataMiddleware, async (req, res) => { await allUsers.fetchUsers(req, res) });
router.post('/user-action', async (req, res, next) => { await blockUnblock.block(req, res, next) });
router.post('/refreshToken', async (req, res, next) => { await refreshControllerAdmin.generateRefreshTokenAmin(req, res, next) })

export { router as adminAuthRoutes };