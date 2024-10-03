import { Application } from "express";
import { authMiddleware } from "../middleware/auth";


export const setupAuth = (app: Application, routes: any[]) => {
    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, authMiddleware)
        }
    })
}