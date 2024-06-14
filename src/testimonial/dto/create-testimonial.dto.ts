import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty({
    description: 'Testimony of alumni',
    example: 'Some long testimony from alumni about dsu',
  })
  @IsNotEmpty()
  @IsString()
  testimony: string;

  @ApiProperty({
    description: 'User id of alumni',
    example: '2',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
