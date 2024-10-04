import { NextFunction, Request, Response } from "express";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { BadRequestError } from "@sahhhallroadmappro/common";



export class BlockUserController {
    private blockUser = DIContainer.blockUserUseCase();
    async block(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            if (!email) {
                throw new BadRequestError('Email is required to block the user.');
            }
            await this.blockUser.excute({ email });
            return res.status(200).json({ message: "User successfully blocked/unblocked" })
        } catch (err) {
            console.log(err)
            next()
        }
    }
}