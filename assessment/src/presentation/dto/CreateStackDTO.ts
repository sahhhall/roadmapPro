import { IsString, MinLength } from 'class-validator';

export class CreateNodeDTO {

    @IsString()
    @MinLength(3)
    name!: string
};