import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@sahhhallroadmappro/common";
import { IGetAllTestsUseCase } from "../../../application/interfaces/admin/IGetAllTestsUseCase";



export class GetAllTestsController {
    constructor(private getAllTests: IGetAllTestsUseCase) { }

    async getTests(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, result } = req.query;
            const stacks = await this.getAllTests.execute(status as string | undefined, result as string | undefined);
            return res.status(HttpStatus.OK).json(stacks)
        } catch (error) {
            next(error)
        }
    }
}