import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailAvailable } from './IsEmailAvailable';
import { PhoneAvailable } from './IsPhoneAvailable';
import { UniEmailAvailable } from './IsUniEmailUnique';

export class CreateUserDto {
  @ApiProperty({ description: 'Alumni Email', example: 'gosaad@outlook.com' })
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
  @IsNotEmpty()
  phone: string;

  // @ApiProperty({ description: 'Registration Status', default: 0 })
  // @IsNotEmpty()
  // registration_status: number;

  // @ApiProperty({ description: 'Active Status', default: false })
  // @IsNotEmpty()
  // active_status: boolean;

  @ApiProperty({ description: 'Alumni Password', example: '12345678' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'first name', example: 'Syed' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: 'middle name', example: 'Saad' })
  @IsNotEmpty()
  middle_name: string;

  @ApiProperty({ description: 'last name', example: 'Luqman', required: false })
  last_name: string;
  //confirmPassword: string;
}
