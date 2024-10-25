import { IsArray, IsNotEmpty, IsString } from 'class-validator';

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
    @IsNotEmpty()
    headline!: string;


    @IsArray()
    @IsString({ each: true })
    languages!: string[]

    @IsString()
    @IsNotEmpty()
    bio!: string;


    @IsString()
    @IsNotEmpty()
    linkedinUrl!: string;

    @IsString()
    @IsNotEmpty()
    githubUrl!: string;
    
}


export { CreateInitialTestDTO }