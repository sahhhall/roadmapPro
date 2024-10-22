import { Request, Response, NextFunction } from "express";
import { IGetAllStackUseCase } from "../../../application/interfaces/admin/IGetAllStacksUseCase";
import { HttpStatus } from "@sahhhallroadmappro/common";



export class GetAllStacksController {
    constructor(private getAllstacks: IGetAllStackUseCase) { }

    async getStacks(req: Request, res: Response, next: NextFunction) {
        try {
            const stacks = await this.getAllstacks.execute();
            return res.status(HttpStatus.ACCEPTED).json(stacks)
        } catch (error) {
            next(error)
        }
    }
}