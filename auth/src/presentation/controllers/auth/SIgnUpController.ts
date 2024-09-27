import { Request, Response } from "express";
import { CreateUserDto } from "../../dto/CreateUserDto";
import { validate } from 'class-validator';
import { DIContainer } from "../../../infrastructure/di/DIContainer";


export class SignUpController {
    private signupUser = DIContainer.getRegisterUserUseCase();
    async signup(req: Request, res: Response) {
        const dto = Object.assign(new CreateUserDto(), req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            //here common package error comes
            return res.status(400).json({ errors });
        }

        try {
            const { name, email, password, avatar } = req.body;
            const user = await this.signupUser.execute({
                name,
                email,
                password,
                avatar
            })
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            //here next function comes to pass error
        }
    }
}