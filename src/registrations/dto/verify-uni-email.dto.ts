import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UniEmailExists } from './DoesUniEmailExists';

export class VerifyUniEmailDto {
  @ApiProperty({
    description: 'University Id / Verification Id',
    example: 'SE102293',
  })
  @IsNotEmpty()
  @UniEmailExists({
    message:
      'Requested Email not exists in Examination Records: Registration or Format Issue',
  })
  uni_reg_id: string;
}
