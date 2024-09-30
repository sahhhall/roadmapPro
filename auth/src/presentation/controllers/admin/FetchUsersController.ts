import { Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";




export class FetchUsersController {
    private getAllUsers = DIContainer.getAllUsersUseCase();
    async fetchUsers(req: Request, res: Response) {
        try {
            const users = await this.getAllUsers.execute()
            res.json(users)
        } catch (error) {
            console.log(error)
            //here next function comes to pass error
        }
    }
}