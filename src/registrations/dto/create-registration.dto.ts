import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UniEmailAvailable } from './IsUniEmailUnique';

export class CreateRegistrationDto {
  @ApiProperty({
    description: 'University Email / Verification Email',
    example: 'saad.luqman@dsu.edu.pk',
  })
  @IsEmail()
  @UniEmailAvailable({ message: 'Duplicate uni_email' })
  uni_email: string;

  @ApiProperty({ description: 'first name', example: 'Syed' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: 'middle name', example: 'Saad' })
  middle_name: string;

  @ApiProperty({ description: 'last name', example: 'Luqman' })
  last_name: string;

  @ApiProperty({ description: 'qualification', example: 'Masters' })
  @IsNotEmpty()
  qualification: string;

  @ApiProperty({ description: 'area', example: 'Computer Science' })
  @IsNotEmpty()
  area: string;

  @ApiProperty({
    description: 'Time of Registration',
    example: '2018-06-01 00:00:00',
  })
  @IsNotEmpty()
  registration_time: Date;

  @ApiProperty({
    description: 'Time of Graduation',
    example: '2022-06-01 00:00:00',
  })
  @IsNotEmpty()
  graduation_time: Date;

  @ApiProperty({ description: 'cgpa', example: '3.7' })
  @IsNotEmpty()
  cgpa: number;
}
