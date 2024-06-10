import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateCorporatePartnerDto {
  @ApiProperty({
    description: 'Name of the corporate partner',
    example: 'Shan',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Corporate partner discounted offer',
    example: '10% of on all products',
  })
  @IsNotEmpty()
  @IsString()
  discounted_offer: string;

  @ApiProperty({
    description: 'Corporate partner discounted offer valid date',
    example: '2018-03-12 00:00:00',
  })
  @IsNotEmpty()
  @IsDateString()
  valid_date: Date;
}
