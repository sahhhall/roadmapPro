import { NotFoundError } from "@sahhhallroadmappro/common";
import { Request, Response, NextFunction } from "express";
import { IGetRequestedRoadmaps } from "../../../application/interfaces/admin/IGetRequestedRoadmaps";


export class GetRequestedRoadmapsController {
    constructor(private readonly getRequestedRoadMap: IGetRequestedRoadmaps) { }

    async requestedRoadmaps(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { status } = req.query;
            console.log(status)
            const roadmaps = await this.getRequestedRoadMap.execute(status as string);
            if (!roadmaps) {
                throw new NotFoundError()
            } else {
                res.status(200).json(roadmaps);
            }
        } catch (error) {
            next(error);
        }
    }
}
