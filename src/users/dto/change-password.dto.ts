import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password of user',
    example: 'some-password',
  })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: 'New password of user',
    example: 'some-password',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
