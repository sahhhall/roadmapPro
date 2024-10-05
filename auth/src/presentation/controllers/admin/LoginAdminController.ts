import { NextFunction, Request, Response } from "express";
import { LoginUserDto } from "../../dto/LoginUserDto";
import { validate } from "class-validator";
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { BadRequestError } from "@sahhhallroadmappro/common";




export class LoginAdminController {
    private loginAdmin = DIContainer.getLoginAdminUserCase();
    async login(req: Request, res: Response, next: NextFunction) {
        // const dto = Object.assign(new LoginUserDto(), req.body);
        // const errors = await validate(dto);
        // if (errors.length > 0) {
        //     //here common package error comes badreq
        //     return res.status(400).json({ errors });
        // };

        try {
            const { email, password } = req.body;
            console.log(email, password)
            const admin = await this.loginAdmin.execute({
                email,
                password
            })
            if (!admin.success) {
                // here common error  badreq
                throw new BadRequestError(admin.error?.message as string)
            };
            res.cookie(`admin_accessToken`, admin.data?.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
            });
            res.cookie(`admin_refreshToken`, admin.data?.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
            });
            res.json({
                admin: admin.data?.admin
            })
        } catch (error) {
            next(error)
            //here next function comes to pass error
        }
    }
}