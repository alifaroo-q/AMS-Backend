import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAcademicDto {
  @ApiProperty({ description: 'qualification type', example: 'Degree' })
  @IsNotEmpty()
  qualification_type: string;

  @ApiProperty({ description: 'qualification', example: 'Masters' })
  @IsNotEmpty()
  qualification: string;

  @ApiProperty({ description: 'area', example: 'Computer Science' })
  area: string;

  @ApiProperty({ description: 'institute', example: 'DHA Suffa University' })
  @IsNotEmpty()
  institute: string;

  @ApiProperty({
    description: 'institute address',
    example: 'KHI Branch',
    required: false,
  })
  @IsNotEmpty()
  institute_address: string;

  @ApiProperty({ description: 'start year', example: '2020-12-25 05:00:00' })
  @IsNotEmpty()
  start_year: Date;

  @ApiProperty({ description: 'end year', example: '2022-11-25 05:10:00' })
  @IsNotEmpty()
  end_year: Date;

  @ApiProperty({ description: 'score', example: '3.7' })
  score: string;

  @ApiProperty({ description: 'score unit', example: 'cgpa' })
  score_unit: string;

  @ApiProperty({ description: 'status', example: 'Completed' })
  @IsNotEmpty()
  status: string;
  /* score unit */

  @ApiProperty({ description: 'has certificate', default: false })
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
