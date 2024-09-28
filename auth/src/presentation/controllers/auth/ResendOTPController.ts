import { validate } from "class-validator";
import { Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { ResentOtpDTO } from "../../dto/ResentOtpDto"; 

export class ResendOtpController {
    private sendOtpEmailUseCase = DIContainer.getEmailServiceUseCase();
    private resendOtpUseCase = DIContainer.getResendOtpUseCase();

    async resendOtp(req: Request, res: Response): Promise<Response> {
      
        const dto = Object.assign(new ResentOtpDTO(), req.body);
        console.log(dto,"dto")
        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        try {
            const otp = await this.resendOtpUseCase.execute({ email: dto.email }) as string;

            await this.sendOtpEmailUseCase.execute({ email: dto.email, name: "fix later", otp });

            return res.status(200).json({ message: "OTP  resent successfully.", otp });
        } catch (error) {
            console.error("Error while resending OTP:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
}