import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @MinLength(6)
    password!: string;

    @IsString()
    role!: string;
}