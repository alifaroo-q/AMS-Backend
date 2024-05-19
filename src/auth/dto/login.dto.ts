import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email', example: 'test@tt.tt' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password', example: 'tttt' })
  @IsNotEmpty()
  password: string;
}
