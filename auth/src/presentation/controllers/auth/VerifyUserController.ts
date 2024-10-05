import { Request, Response } from "express";
import { validate } from "class-validator";
import { VerifyOtpDto } from "../../dto/VerifyOtpDto";
import { DIContainer } from "../../../infrastructure/di/DIContainer";


export class OtpVerifyController {
    private verifyUser = DIContainer.verifyUserUserCase()
    async verify(req: Request, res: Response): Promise<Response> {
        const dto = Object.assign(new VerifyOtpDto(), req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        try {
            const response = await this.verifyUser.execute(dto);
            if (response.success) {
                res.cookie(`user_accessToken`, response.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "none",
                });
                res.cookie(`user_refreshToken`, response.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "none",
                });
                return res.status(200).json({ userVerified: response.user });
            } else {
                return res.status(400).json({ message: response.message });
            }
        } catch (error) {
            console.error("Error in OTP verification controller:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}