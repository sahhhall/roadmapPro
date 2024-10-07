import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { NotFoundError } from "@sahhhallroadmappro/common";

export class RefreshTokenAdmin {
    private adminTokenUseCase = DIContainer.adminRefeshTokenUseCase();

    async generateRefreshTokenAmin(req: Request, res: Response, next: NextFunction) {
        try {
            if (req?.cookies?.admin_refreshToken) {
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
                throw new NotFoundError();
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            next(error)
        }
    }
}

export const refreshControllerAdmin = new RefreshTokenAdmin();
