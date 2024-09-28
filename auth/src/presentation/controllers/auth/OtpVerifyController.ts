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
            const userVerified = await this.verifyUser.execute(dto);
            if (userVerified) {
                
                return res.status(200).json({ userVerified });
            } else {
                return res.status(400).json({ message: "Invalid OTP." });
            }
        } catch (error) {
            console.error("Error in OTP verification controller:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}