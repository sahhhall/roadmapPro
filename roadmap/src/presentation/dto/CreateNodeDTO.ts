import { IsString, MinLength } from 'class-validator';

export class CreateNodeDTO {

    @IsString()
    @MinLength(3)
    type!: string

    @MinLength(5)
    data!: string

    @IsString()
    roadmapId!: string;
};