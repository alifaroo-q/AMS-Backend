import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  MinDate,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ description: 'date of birth', example: '2020-12-25 05:00:00' })
  @IsDate()
  @Transform(({ value }) => new Date(value)) //-- (confused) not necessary has already { transform: true } in main.ts
  @MinDate(new Date('1800-12-29'))
  date_of_birth: Date;

  @ApiProperty({ description: 'Country', example: 'Pakistan' })
  @MinLength(2)
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'Timezone', example: 'GMT+5' })
  @IsDefined()
  @IsNotEmpty()
  timezone: string;
}
