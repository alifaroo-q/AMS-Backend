import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  //   @ApiProperty({ description: 'Password', example: 'same1234' })
  //   @IsNotEmpty()
  //   new_password: string;

  @ApiProperty({ description: 'Password', example: 'same1234' })
  @IsNotEmpty()
  password: string;
}
