import { Request, Response } from "express";
import { CreateUserDto } from "../../dto/CreateUserDto";
import { validate } from 'class-validator';
import { DIContainer } from "../../../infrastructure/di/DIContainer";


export class SignUpController {
    private signupUser = DIContainer.getRegisterUserUseCase();
    private getUser = DIContainer.getUserUseCase();
    private tempStoreAndOtp = DIContainer.getTemporaryStorUseCase();
    async signup(req: Request, res: Response) {
        const dto = Object.assign(new CreateUserDto(), req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            //here common package error comes
            return res.status(400).json({ errors });
        }

        try {
            const { name, email, password, avatar } = req.body;
            const userExist = await this.getUser.execute({ email })
            if (userExist) {
                // here common error comes 
                return res.status(409).json({ message: "user already exist with this email " })
            }
            const otp = await this.tempStoreAndOtp.execute({ name, email, password, avatar });
            console.log(otp,"otp");
            // const user = await this.signupUser.execute({
            //     name,
            //     email,
            //     password,
            //     avatar
            // })
            res.status(200).json({})
        } catch (error) {
            console.log(error)
            //here next function comes to pass error
        }
    }
}