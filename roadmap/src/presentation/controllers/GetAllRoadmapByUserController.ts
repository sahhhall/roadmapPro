import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@sahhhallroadmappro/common";
import { IGetMyRoadmapByUser } from "../../application/interfaces/IGetMyRoadmapByUser";

export class GetAllRoadmapByUserController {
    constructor(private readonly roadmapByUser: IGetMyRoadmapByUser) { }
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const { status } = req.query;
            const bookings = await this.roadmapByUser.execute(userId, status as string);
            return res.status(HttpStatus.OK).json(bookings);
        } catch (error) {
            next(error);
        }
    }
}