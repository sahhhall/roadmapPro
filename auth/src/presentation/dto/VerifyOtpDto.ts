import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
    @IsString()
    @Length(4, 4) 
    otp!: string;

    @IsEmail()
    email!: string;
}