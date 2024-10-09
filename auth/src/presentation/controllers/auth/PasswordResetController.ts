import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { BlockError, NotFoundError } from "@sahhhallroadmappro/common";
import { User } from "../../../domain/entities/User";



export class PasswordResetController {
    private resetToken = DIContainer.resetPasswordTokenUseCase();
    private sentEmail = DIContainer.SendLinkResetPasswordUseCase();
    async reset(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const result = await this.resetToken.execute({ email });
            if(result?.blocked){
                throw new BlockError();
            }
            if (!result.success) {
                throw new NotFoundError();
            }
            await this.sentEmail.execute({ email, name: result?.user!.name, token: result.token })
            res.status(200).json({ message: 'Reset password email sent successfully.' });
        } catch (error) {
            next(error)
        }
    }
}