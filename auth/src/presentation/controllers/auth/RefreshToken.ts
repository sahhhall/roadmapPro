import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { NotFoundError } from "@sahhhallroadmappro/common";

export class RefreshTokenUser {
    private userTokenUseCase = DIContainer.refreshTokenUserUseCase();

    async generateRefreshTokenUser(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.cookies.user_refreshToken, "usr")
            if (req?.cookies?.user_refreshToken) {
                const result = await this.userTokenUseCase.execute(req.cookies.user_refreshToken);

                res.cookie(`user_accessToken`, result.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "none",
                });
                res.cookie(`user_refreshToken`, result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "none",
                });

                return res.status(200).json({ message: "Tokens refreshed successfully." });
            } else {
                throw new NotFoundError();
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            next(error)
        }
    }
}

export const refreshControllerUser = new RefreshTokenUser();
