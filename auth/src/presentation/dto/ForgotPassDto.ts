import { IsEmail } from "class-validator";

export class ForgotPasswordDTO {
    @IsEmail()
    email!: string;
}