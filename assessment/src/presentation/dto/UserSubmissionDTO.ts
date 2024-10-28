import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';



class UserSubmissionDTO {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsArray()
    questions!: [];
}

export { UserSubmissionDTO };
