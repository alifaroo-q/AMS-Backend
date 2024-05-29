import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  MinDate,
  MinLength,
} from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({ description: 'Email', example: 'gosaad@outlook.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'University Email / Verification Email',
    example: 'saad.luqman@dsu.edu.pk',
  })
  @IsOptional()
  @IsEmail()
  uni_email: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '+92 337033321',
  })
  @IsOptional()
  phone: string;

  @ApiProperty({ description: 'first name', example: 'Syed' })
  @IsOptional()
  first_name: string;

  @ApiProperty({ description: 'middle name', example: 'Saad' })
  @IsOptional()
  middle_name: string;

  @ApiProperty({ description: 'last name', example: 'Luqman', required: false })
  @IsOptional()
  last_name: string;

  @ApiProperty({ description: 'date of birth', example: '2020-12-25 05:00:00' })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date('1800-12-29'))
  date_of_birth: Date;

  @ApiProperty({ description: 'Country', example: 'Pakistan' })
  @IsOptional()
  @MinLength(3)
  country: string;

  @ApiProperty({ description: 'Timezone', example: 'GMT+5' })
  @IsOptional()
  timezone: string;
}
