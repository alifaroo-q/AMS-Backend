import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsNotEmpty()
  @IsString()
  testimony: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
