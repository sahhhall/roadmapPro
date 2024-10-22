import { IsString, MinLength } from 'class-validator';

class CreateStackDTO {
    @IsString()
    @MinLength(3)
    name!: string
};

export { CreateStackDTO}