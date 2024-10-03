import { Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";

interface AuthenticatedRequest extends Request {
    admin?: any | null;
}


export class FetchUsersController {
    private getAllUsers = DIContainer.getAllUsersUseCase();
    async fetchUsers(req: AuthenticatedRequest, res: Response) {
        try {
            console.log(req?.admin, "req admin")
            const users = await this.getAllUsers.execute()
            res.json(users)
        } catch (error) {
            console.log(error)
            //here next function comes to pass error
        }
    }
}