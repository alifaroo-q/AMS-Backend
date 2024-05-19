import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateExperienceDto } from './create-experience.dto';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
  @ApiProperty({ description: 'company', example: 'SPARCO' })
  @IsNotEmpty()
  company: string;

  @ApiProperty({ description: 'designation', example: 'Trainee' })
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ description: 'status', example: 'Contract' })
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'nature of job', example: 'Federal Government' })
  @IsNotEmpty()
  nature_of_job: string;

  @ApiProperty({ description: 'start year', example: '2020-12-25 05:00:00' })
  @IsNotEmpty()
  start_year: Date;

  @ApiProperty({ description: 'end year', example: '2022-11-25 05:10:00' })
  @IsNotEmpty()
  end_year: Date;
}
