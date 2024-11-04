import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PriceUpdateDTO {
    @IsString()
    @IsNotEmpty()
    mentorId!: string;

    @IsNumber()
    @IsNotEmpty()
    pricePerSession!: number;
}
