import { NotFoundError } from "@sahhhallroadmappro/common";
import { IGetNodeDetails } from "../../application/interfaces/IGetNodeDetails";
import { Request, Response, NextFunction } from "express";



export class GetNodeDetailsController {
    constructor(private readonly getNodeDetailsUseCase: IGetNodeDetails) { }

    async getNodeDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const { nodeId } = req.body;
            const nodeDetails = await this.getNodeDetailsUseCase.execute(nodeId);
            if (!nodeDetails) {
                throw new NotFoundError()
            }

            res.status(200).json(nodeDetails);
        } catch (error) {
            next(error)
        }

    }
}