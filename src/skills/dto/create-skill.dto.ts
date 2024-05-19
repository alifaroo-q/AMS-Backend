import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ description: 'main category', example: 'Software' })
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: 'sub category', example: 'Web Development' })
  @IsNotEmpty()
  sub_category: string;

  @ApiProperty({ description: 'tags', example: 'MERN Stack,CSS,HTML,JS,REACT' })
  @IsNotEmpty()
  tags: string;

  @ApiProperty({ description: 'expert level', example: 50 })
  @IsNotEmpty()
  level: number;

  @ApiProperty({ description: 'has certificate', default: false })
  @IsNotEmpty()
  has_certificate: boolean;

  @ApiProperty({ description: 'certificate', required: false, default: null })
  certificate: string;

  @ApiProperty({
    description: 'certificate link',
    required: false,
    default: null,
  })
  certificate_link: string;
}
