import { Request, Response } from "express";

export class LogoutController {
    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("admin_accessToken")
            res.clearCookie("admin_refreshToken")
            res.status(200).json({ message: "user successfully logged out" });
        } catch (error) {
            console.log(error)
        }
    }
}