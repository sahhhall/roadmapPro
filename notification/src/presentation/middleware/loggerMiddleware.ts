import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from '@sahhhallroadmappro/common';

export const customLogger = winstonLogger('notification-service');

declare global {
    namespace Express {
        export interface Request {
            logger?: any,
            user?: {
                id: string,
                email: string
            }
        }
    }
}
const loggerMiddleware = (req: any, res: Response, next: NextFunction) => {
    req.logger = customLogger;
    next();
};
export default loggerMiddleware;
