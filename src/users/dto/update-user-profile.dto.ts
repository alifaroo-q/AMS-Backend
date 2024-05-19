import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinDate,
  MinLength,
} from 'class-validator';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { CreateUserDto } from './create-user.dto';
import { PhoneAvailable } from './IsPhoneAvailable';

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
  //confirmPassword: string;
  //for profile
  @ApiProperty({ description: 'date of birth', example: '2020-12-25 05:00:00' })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value)) //-- (confused)not necessary has already { transform: true } in main.ts
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

// extends PartialType(CreateUserDto) {
//   @ApiProperty({ description: 'Email', example: 'gosaad@outlook.com' })
//   @IsEmail()
//   @EmailAvailable({ message: 'Email Already Exists' })
//   email: string;

//   @ApiProperty({
//     description: 'University Email / Verification Email',
//     example: 'saad.luqman@dsu.edu.pk',
//   })
//   @IsEmail()
//   @UniEmailAvailable({ message: 'Uni Email Already Exists' })
//   uni_email: string;

//   @ApiProperty({
//     description: 'Phone Number',
//     example: '+92 337033321',
//   })
//   phone: string;

//   @ApiProperty({ description: 'first name', example: 'Syed' })
//   first_name: string;
//   @ApiProperty({ description: 'middle name', example: 'Saad' })
//   middle_name: string;
//   @ApiProperty({ description: 'last name', example: 'Luqman', required: false })
//   last_name: string;
//   //confirmPassword: string;
//   //for profile
//   @ApiProperty({ description: 'date of birth', example: '2020-12-25 05:00:00' })
//   @IsDate()
//   @Transform(({ value }) => new Date(value)) //-- (confused)not necessary has already { transform: true } in main.ts
//   @MinDate(new Date('1800-12-29'))
//   date_of_birth: Date;

//   @ApiProperty({ description: 'Country', example: 'Pakistan' })
//   @MinLength(3)
//   country: string;

//   @ApiProperty({ description: 'Timezone', example: 'GMT+5' })
//   timezone: string;
// }
