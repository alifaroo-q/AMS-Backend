import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    //description: 'University Email / Verification Email',
    description: 'token',
    example: 'b91ll6360h6fcs4ex0patdnqcixxiztue3tofeba',
  })
  //@IsEmail()
  @IsNotEmpty()
  token: string;
}
