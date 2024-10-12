import { NextFunction, Request, Response } from 'express';
import { ICreateNodeUseCase } from '../../application/interfaces/ICreateNodeUseCase';
import { BadRequestError } from '@sahhhallroadmappro/common';

export class NodeController {
    constructor(private createNodeUseCase: ICreateNodeUseCase) { }

    async createNode(req: Request, res: Response, next: NextFunction) {
        try {
            const { roadmapId, type, position, data } = req.body;

            const newNode = await this.createNodeUseCase.execute({
                data,
                position,
                type,
                roadmapId
            });
            if (!newNode) {
                throw new BadRequestError('node creation problem');
            }
            return res.status(201).json(newNode);
        } catch (error) {
            next(error)
        }
    }
}
