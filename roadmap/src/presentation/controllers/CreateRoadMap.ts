import { Request, Response, NextFunction } from "express";
import { IRoadMapCreate } from "../../application/interfaces/IRoadmapCreate";
import { ConflictError } from "@sahhhallroadmappro/common";





export class CreateRoadMap {
    constructor(private roadmapUseCase: IRoadMapCreate) { }

    async createRoadMap(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, userId } = req.body;
            
            const newRoadMap = await this.roadmapUseCase.execute({ title, description, userId });
            if (!newRoadMap) {
                throw new ConflictError('Roadmap title already taken')
            }
            return res.status(201).json(newRoadMap);
        } catch (error) {
            next(error)
        }
    }
}