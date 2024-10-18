import { NotFoundError } from "@sahhhallroadmappro/common";
import { Request, Response, NextFunction } from "express";
import { IGetRequestedRoadmaps } from "../../../application/interfaces/admin/IGetRequestedRoadmaps";


export class GetRequestedRoadmapsController {
    constructor(private readonly getAllRoadMaps: IGetRequestedRoadmaps) { }

    async requestedRoadmaps(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roadmaps = await this.getAllRoadMaps.execute();
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
