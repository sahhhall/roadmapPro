// src/middleware/loggerMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from '@sahhhallroadmappro/common';


declare global {
    namespace Express {
        export interface Request {
            logger?: any
        }
    }
}
const loggerMiddleware = (req: any, res: Response, next: NextFunction) => {
    req.logger = winstonLogger('auth-service');
    next();
};

// class Logger {
//     constructor(private logger = useLogger) { }

//     public loggermiddleware(req: any, res: Response, next: NextFunction) {
//         req.logger = this.logger;
//         next
//     }

// }

export default loggerMiddleware;
