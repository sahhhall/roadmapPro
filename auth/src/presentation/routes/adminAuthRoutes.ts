import { Router } from 'express';
import { LoginAdminController } from '../controllers/admin/LoginAdminController';
import { LogoutController } from '../controllers/auth/LogoutUserController';
import { FetchUsersController } from '../controllers/admin/FetchUsersController';
import { adminDataMiddleware, BadRequestError } from '@sahhhallroadmappro/common';



const router = Router();
const adminLogin = new LoginAdminController();
const adminLogout = new LogoutController();
const allUsers = new FetchUsersController();
router.post('/', async (req, res) => { await adminLogin.login(req, res) });
router.post('/logout', async (req, res) => { await adminLogout.logout(req, res) });
router.get('/users', adminDataMiddleware, async (req, res) => { await allUsers.fetchUsers(req, res) });

export { router as adminAuthRoutes };