import { Request, Response, NextFunction } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { BadRequestError } from "@sahhhallroadmappro/common";

export class PasswordResetVerify {
    private validatePasswordReset = DIContainer.confirmPasswordResetUseCase();

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, token, newPassword } = req.body;
            console.log(req.body)
            const result = await this.validatePasswordReset.execute({ email, token, newPassword });

            if (!result.success) {
               throw new BadRequestError(`${result!.message}`)
            }
            return res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            next(error);
        }
    }
}
