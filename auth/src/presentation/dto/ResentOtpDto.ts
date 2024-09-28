import { IsEmail, isEmail, IsString, Length } from "class-validator";


export class ResentOtpDTO {
    @IsEmail()
    email!: string
}