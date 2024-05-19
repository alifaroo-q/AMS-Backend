import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UniEmailExists } from './DoesUniEmailExists';
import { IsUniEmailUnique, UniEmailAvailable } from './IsUniEmailUnique';

export class VerifyUniEmailDto {
  @ApiProperty({
    //description: 'University Email / Verification Email',
    description: 'University Id / Verification Id',
    example: 'SE102293',
  })
  //@IsEmail()
  @IsNotEmpty()
  @UniEmailExists({
    message:
      'Requested Email not exists in Examination Records: Registration or Format Issue',
  })
  uni_reg_id: string;
}
