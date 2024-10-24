import { IsNotEmpty, IsString } from 'class-validator';

class CreateInitialTestDTO {
    // @IsString()
    // @IsNotEmpty()
    // userId!: string;

    @IsString()
    @IsNotEmpty()
    stackId!: string;

    @IsString()
    @IsNotEmpty()
    expirience!: string;

    @IsString()
    certificate?: string;

    @IsString()
    @IsNotEmpty()
    description!: string;
}


export { CreateInitialTestDTO }