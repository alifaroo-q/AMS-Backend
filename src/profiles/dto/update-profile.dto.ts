import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  MinDate,
  MinLength,
} from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @ApiProperty({ description: 'date of birth', example: '2020-12-25 05:00:00' })
  @IsDate()
  @Transform(({ value }) => new Date(value)) //-- (confused)not necessary has already { transform: true } in main.ts
  @MinDate(new Date('1800-12-29'))
  date_of_birth: Date;

  @ApiProperty({ description: 'Country', example: 'Pakistan' })
  @MinLength(3)
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'Timezone', example: 'GMT+5' })
  @IsDefined()
  @IsNotEmpty()
  timezone: string;
}
