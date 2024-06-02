import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateJobDto {
  @ApiProperty({
    description: 'Title of job',
    example: 'Frontend Developer',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of what job is about',
    example: 'frontend developer with experience in react',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'End date for job application',
    example: '2018-06-01 00:00:00',
  })
  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @ApiProperty({
    description: 'Name of organization for job',
    example: '10Pearls',
  })
  @IsNotEmpty()
  @IsString()
  organization_name: string;

  @ApiProperty({
    description: 'Email of organization for job',
    example: 'hr@10pearls.com',
  })
  @IsNotEmpty()
  @IsEmail()
  organization_email: string;

  @ApiProperty({
    description: 'Location of job / organization',
    example: 'Karachi',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ description: 'Salary for the job', example: '50000' })
  @IsNotEmpty()
  @IsString()
  salary: string;

  @ApiProperty({
    description: 'Currency of salary',
    example: '$ / Eur / RS',
  })
  @IsNotEmpty()
  @IsEnum({ $: '$', Eur: 'Eur', RS: 'RS' })
  @IsString()
  salary_type: string;

  @ApiProperty({ description: 'Type of job', example: 'Remote / Onsite' })
  @IsNotEmpty()
  @IsEnum({ Remote: 'Remote', Onsite: 'Onsite' })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Level of experience for job',
    example: 'Intermediate / Fresh / Intern / Experience',
  })
  @IsNotEmpty()
  @IsEnum({
    Fresh: 'Fresh',
    Intern: 'Intern',
    Intermediate: 'Intermediate',
    Experience: 'Experience',
  })
  @IsString()
  experience: string;

  @ApiProperty({
    description: 'Time of the job',
    example: 'Full time / Part time / Project based ',
  })
  @IsNotEmpty()
  @IsEnum({
    Full_Time: 'Full Time',
    Part_Time: 'Part Time',
    Project_Based: 'Project Based',
  })
  @IsString()
  job_time: string;

  @ApiProperty({
    description: 'Schedule metrics of the job',
    example: 'Per Hour / Per Week / Per Month',
  })
  @IsNotEmpty()
  @IsEnum({
    Per_Hour: 'Per Hour',
    Per_Week: 'Per Week',
    Per_Month: 'Per Month',
  })
  schedule_metrics: string;
}
