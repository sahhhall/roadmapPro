import { Application } from 'express';
import { adminAuthMiddleware, authMiddleware } from '../middleware/auth';

export const setupAuth = (app: Application, routes: any[]) => {
    routes.forEach(route => {
        if (route.auth === "admin") {
            app.use(route.url, adminAuthMiddleware);  // Apply admin auth middleware
        } else if (route.auth === "user") {
            app.use(route.url, authMiddleware);  // Apply user auth middleware
        }
    });
};