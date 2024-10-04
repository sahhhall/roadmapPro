import { Router } from 'express';
import { LoginAdminController } from '../controllers/admin/LoginAdminController';
import { FetchUsersController } from '../controllers/admin/FetchUsersController';
import { adminDataMiddleware } from '@sahhhallroadmappro/common';
import { BlockUserController } from '../controllers/admin/BlockUserController';
import { LogoutAdminController } from '../controllers/admin/LogoutAdminController';



const router = Router();
const adminLogin = new LoginAdminController();
const adminLogout = new LogoutAdminController();
const allUsers = new FetchUsersController();
const blockUnblock = new BlockUserController()
router.post('/', async (req, res) => { await adminLogin.login(req, res) });
router.post('/logout', async (req, res) => { await adminLogout.logout(req, res) });
router.get('/users', adminDataMiddleware, async (req, res) => { await allUsers.fetchUsers(req, res) });
router.post('/user-action', async (req, res, next) => { await blockUnblock.block(req, res, next) })
export { router as adminAuthRoutes };