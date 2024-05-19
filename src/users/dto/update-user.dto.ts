import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { EmailAvailable } from './IsEmailAvailable';
import { PhoneAvailable } from './IsPhoneAvailable';
import { UniEmailAvailable } from './IsUniEmailUnique';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'Email', example: 'gosaad@outlook.com' })
  @IsEmail()
  @EmailAvailable({ message: 'Email Already Exists' })
  email: string;

  @ApiProperty({
    description: 'University Email / Verification Email',
    example: 'saad.luqman@dsu.edu.pk',
  })
  @IsEmail()
  @UniEmailAvailable({ message: 'Uni Email Already Exists' })
  uni_email: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '+92 337033321',
  })
  @PhoneAvailable({ message: 'Phone Already Exists' })
  phone: string;

  @ApiProperty({ description: 'Registration Status', default: 0 })
  registration_status: number;

  @ApiProperty({ description: 'Active Status', default: false })
  active_status: boolean;

  @ApiProperty({ description: 'Password', example: '12345678' })
  password: string;

  @ApiProperty({ description: 'Password Reset Token', example: '12345678' })
  password_reset_token: string;

  @ApiProperty({ description: 'first name', example: 'Syed' })
  first_name: string;
  @ApiProperty({ description: 'middle name', example: 'Saad' })
  middle_name: string;
  @ApiProperty({ description: 'last name', example: 'Luqman', required: false })
  last_name: string;
  //confirmPassword: string;
}
