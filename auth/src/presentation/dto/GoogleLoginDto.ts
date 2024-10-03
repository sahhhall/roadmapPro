import { IsEmail, IsOptional, IsString } from "class-validator";

export class GoogleLoginDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsOptional() 
    @IsString()
    avatar!: string;
}