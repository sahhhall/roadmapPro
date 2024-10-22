import { IsString, IsArray, IsMongoId, MinLength, IsNotEmpty } from 'class-validator';

export class CreateQuestionDTO {
    @IsMongoId()
    @IsNotEmpty()
    stackId!: string;

    @IsString()
    @MinLength(10)
    question!: string;

    @IsArray()
    @IsString({ each: true })
    options!: string[];

    @IsString()
    @IsNotEmpty()
    correctAnswer!: string;
}