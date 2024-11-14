import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@sahhhallroadmappro/common';

export class UpdateUserProfileController {

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.file, "req.body");
            console.log(req.files,"req.file")
        } catch (error) {
            next(error)
        }
    }
}