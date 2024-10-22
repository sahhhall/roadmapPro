import { Logger } from 'winston';
import { Request } from 'express';

declare global {
    namespace Express {
        export interface Request {
            logger?: any
        }
    }
}