import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateBookingDTO {
  
  @IsNotEmpty()
  @IsString()
  menteeId!: string;

  @IsNotEmpty()
  @IsString()
  mentorId!: string;

  @IsNotEmpty()
  @IsDateString()
  date!: string;
}
