import { Application } from 'express';
import rateLimit from 'express-rate-limit';

export const setupRateLimit = (app: Application, routes: any[]) => {
    routes.forEach(r => {
        if (r.rateLimit) {
            app.use(r.url, rateLimit(r.rateLimit));
        }
    });
};
