import { Request, Response, NextFunction } from "express";
import { IGetRoadMap } from "../../application/interfaces/IGetRoadMap";
import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "@sahhhallroadmappro/common";



export class GetRoadMapController {
    constructor(private readonly getRoadMapService: IGetRoadMap) { }

    async getRoadMap(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { roadmapId } = req.params;
            if (!mongoose.Types.ObjectId.isValid(roadmapId)) {
                throw new BadRequestError("Invalid Roadmap ID.");
            }

            const objectId = new mongoose.Types.ObjectId(roadmapId); 

            const roadmap = await this.getRoadMapService.execute(objectId);

            if (!roadmap) {
                throw new NotFoundError()
            }

            res.status(200).json(roadmap);
        } catch (error) {
            next(error);
        }
    }
}