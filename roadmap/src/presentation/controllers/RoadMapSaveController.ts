import { NextFunction, Request, Response } from "express";
import { ISaveRoadmap } from "../../application/interfaces/ISaveRoadMap";





export class RoadMapSaveController {
    constructor(private saveRoadMapUseCase: ISaveRoadmap) { }


    async saveRoadmap(req: Request, res: Response, next: NextFunction) {
        try {
            const { roadmapId, nodes, edges, nodeDetails } = req.body;

            const updatedRoadmap = await this.saveRoadMapUseCase.execute({
                roadmapId,
                nodes,
                edges,
                nodeDetails
            });

            return res.status(201).json(updatedRoadmap);
        } catch (err: any) {
            console.log(err)
            next(err)
        }
    }
}