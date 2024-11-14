import { IsMongoId, IsString } from 'class-validator';

export class UpdateMentorDTO {

    @IsString()
    @IsMongoId()
    mentorId!: string;
};