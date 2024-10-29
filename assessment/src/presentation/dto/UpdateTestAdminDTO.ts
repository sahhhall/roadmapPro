import { IsNotEmpty, IsString, IsArray, ArrayMinSize, IsOptional } from 'class-validator';



class UpdateTestAdminDTO {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    result!: 'failed' | 'passed';

    @IsString()
    @IsOptional()
    resultFeedback!: string;
}

export { UpdateTestAdminDTO };
