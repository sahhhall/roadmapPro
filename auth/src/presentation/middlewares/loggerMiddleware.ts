// src/middleware/loggerMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from '@sahhhallroadmappro/common';

const useLogger = winstonLogger('auth-service');

const loggerMiddleware = (req: any, res: Response, next: NextFunction) => {
    req.logger = useLogger;
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
