import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';



class UserSubmissionDTO {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsArray()
    @ArrayMinSize(1)
    questions!: [];
}

export { UserSubmissionDTO };
