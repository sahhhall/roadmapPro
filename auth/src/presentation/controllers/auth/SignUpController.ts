import { Request, Response } from "express";
import { CreateUserDto } from "../../dto/CreateUserDto";
import { validate } from 'class-validator';
import { DIContainer } from "../../../infrastructure/di/DIContainer";
import { Password } from "../../../application/services/PasswordHash";


export class SignUpController {
    private getUser = DIContainer.getUserUseCase();
    private temporaryStoreAndOtpUseCase = DIContainer.getTemporaryStorUseCase();
    private sendOtpEmailUseCase = DIContainer.getEmailServiceUseCase();
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
            const otp = await this.temporaryStoreAndOtpUseCase.execute({ name, email, password, avatar }) as string;
            console.log(otp, "otp");
            await this.sendOtpEmailUseCase.execute({ email, name, otp })
            res.status(200).json({ message: "OTP sent to email.", email });
        } catch (error) {
            console.log(error)
            //here next function comes to pass error
        }
    }
}