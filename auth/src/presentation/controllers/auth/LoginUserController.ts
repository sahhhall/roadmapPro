import { NextFunction, Request, Response } from "express";
import { LoginUserDto } from "../../dto/LoginUserDto";
import { validate } from "class-validator";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { BadRequestError, NotFoundError } from "@sahhhallroadmappro/common";




export class LoginController {
    private loginUser = DIContainer.getLoginUserUseCase();
    async login(req: Request, res: Response, next: NextFunction) {
        const dto = Object.assign(new LoginUserDto(), req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            //here common package error comes badreq
            return res.status(400).json({ errors });
        };

        try {
            const { email, password } = req.body;
            const user = await this.loginUser.execute({
                email,
                password
            })
            if (user?.notfound) {
                throw new NotFoundError();
            }
            if (!user) {
                // here common error  badreq
                throw new BadRequestError('password not correct')
            };
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
                user: user?.user
            })
        } catch (error) {
            console.log(error)
            next(error)
            //here next function comes to pass error
        }
    }
}