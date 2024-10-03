import { Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";




export class GoogleLoginController {
    private loginGoogle = DIContainer.getGoogleLoginUseCase();
    async login(req: Request, res: Response) {
        try {
            const { email, name, avatar } = req.body;
            const user = await this.loginGoogle.execute({
                email,
                name,
                avatar,
                password: "123456"
            });
            res.cookie(`user_accessToken`, user.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
            });
            res.cookie(`user_refreshToken`, user.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
            });
            res.json({
                user: user.user,
                accessToken: user.accessToken
            })
        } catch (err) {
            console.log(err)
        }
    }
}