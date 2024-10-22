import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from '@sahhhallroadmappro/common';

export const customLogger =  winstonLogger('assessment-service');

declare global {
    namespace Express {
        export interface Request {
            logger?: any
        }
    }
}
const loggerMiddleware = (req: any, res: Response, next: NextFunction) => {
    req.logger =customLogger;
    next();
};
export default loggerMiddleware;
