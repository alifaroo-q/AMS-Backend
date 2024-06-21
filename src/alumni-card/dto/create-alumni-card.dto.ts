import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlumniCardDto {
  @ApiProperty({
    description: 'User id of alumni',
    example: '2',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
