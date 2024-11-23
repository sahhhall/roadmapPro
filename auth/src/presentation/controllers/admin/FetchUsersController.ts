import { Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";

interface AuthenticatedRequest extends Request {
    admin?: any | null;
}


export class FetchUsersController {
    private getAllUsers = DIContainer.getAllUsersUseCase();
    async fetchUsers(req: AuthenticatedRequest, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 5;
            
            const { users, total } = await this.getAllUsers.execute(page, pageSize);
            
            res.json({
                users,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / pageSize)
            });
        } catch (error) {
            console.log(error)
            //here next function comes to pass error
        }
    }
}