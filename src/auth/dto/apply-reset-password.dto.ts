import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailExist } from './DoesEmailExists';

export class ApplyResetPasswordDto {
  @ApiProperty({
    //description: 'University Email / Verification Email',
    description: 'Account Email / Verification Email',
    example: 'saad@outlook.com',
  })
  //@IsEmail()
  @IsNotEmpty()
  @IsEmail()
  @EmailExist({
    message: 'Email Not Found',
  })
  email: string;
}
