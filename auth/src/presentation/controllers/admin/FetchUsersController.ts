import { Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";

interface AuthenticatedRequest extends Request {
    admin?: any | null;
}


export class FetchUsersController {
    private getAllUsers = DIContainer.getAllUsersUseCase();
    async fetchUsers(req: AuthenticatedRequest, res: Response) {
        try {
            const { page = 1, pageSize = 5 } = req.query;
            const users = await this.getAllUsers.execute(parseInt(page as string), parseInt(pageSize as string));
            res.json(users)
        } catch (error) {
            console.log(error)
            //here next function comes to pass error
        }
    }
}