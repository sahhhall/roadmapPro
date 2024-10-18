import { Request, Response, NextFunction } from "express";
import { IGetAllRoadMaps } from "../../application/interfaces/IGetAllRoadMaps";
import { NotFoundError } from "@sahhhallroadmappro/common";

export class PublishRoadmapController {
    constructor(private readonly getAllRoadMaps: IGetAllRoadMaps) { }

    async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
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
