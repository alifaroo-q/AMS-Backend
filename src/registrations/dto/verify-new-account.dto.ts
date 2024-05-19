import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailAvailable } from 'src/users/dto/IsEmailAvailable';
import { PhoneAvailable } from 'src/users/dto/IsPhoneAvailable';

export class VerifyNewAccountDto {
  @ApiProperty({
    description: 'Account Email / Verification Email',
    example: 'gosaad@outlook.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @EmailAvailable({
    message: 'Requested Email is Already Registered: Registration',
  })
  email: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '+92 337033321',
  })
  @IsNotEmpty()
  @PhoneAvailable({ message: 'Phone is Already Registered: Registration' })
  phone: string;

  @ApiProperty({ description: 'Password', example: '12345678' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Registration Id', example: '23' })
  @IsNotEmpty()
  reg_id: number;
}
