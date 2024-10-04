import { Request, Response } from "express";

export class LogoutAdminController {
    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("admin_accessToken")
            res.clearCookie("admin_refreshToken")
            res.status(200).json({ message: "admin successfully logged out" });
        } catch (error) {
            console.log(error)
        }
    }
}