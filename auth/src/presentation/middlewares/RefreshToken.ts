import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";

export class RefreshTokenMiddleware {
    private userTokenUseCase = DIContainer.refreshTokenUserUseCase();
    private adminTokenUseCase = DIContainer.adminRefeshTokenUseCase();

    async generateRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.cookies.user_refreshToken,"usr")
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
            } else if (req?.cookies?.admin_refreshToken) {
                const result = await this.adminTokenUseCase.execute(req.cookies.admin_refreshToken);

                res.cookie(`admin_accessToken`, result!.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "none",
                });
                res.cookie(`admin_refreshToken`, result!.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "none",
                });

                return res.status(200).json({ message: "Admin tokens refreshed successfully." });
            } else {
                return res.status(401).json({ message: "No valid refresh token found." });
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            return res.status(500).json({ message: "Internal server error " });
        }
    }
}

export const refreshMiddleware = new RefreshTokenMiddleware();
