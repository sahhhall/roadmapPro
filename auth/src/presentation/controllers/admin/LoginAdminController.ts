import { Request, Response } from "express";
import { LoginUserDto } from "../../dto/LoginUserDto";
import { validate } from "class-validator";
import { DIContainer } from "../../../infrastructure/di/DIContainer";




export class LoginAdminController {
    private loginAdmin = DIContainer.getLoginAdminUserCase();
    async login(req: Request, res: Response) {
        const dto = Object.assign(new LoginUserDto(), req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            //here common package error comes badreq
            return res.status(400).json({ errors });
        };

        try {
            const { email, password } = req.body;
            const admin = await this.loginAdmin.execute({
                email,
                password
            })
            if (!admin) {
                // here common error  badreq
                throw new Error("you are not admin")
            };
            res.cookie(`admin_accessToken`, admin.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
            });
            res.cookie(`admin_refreshToken`, admin.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
            });
            res.json({
                user: admin.user,
                accessToken: admin.accessToken
            })
        } catch (error) {
            console.log(error)
            //here next function comes to pass error
        }
    }
}