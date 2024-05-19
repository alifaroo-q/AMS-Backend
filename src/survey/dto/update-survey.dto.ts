import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateSurveyDto } from './create-survey.dto';

export class UpdateSurveyDto extends PartialType(CreateSurveyDto) {
  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q1: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q2: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q3: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q4: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q5: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q6: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q7: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q8: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q9: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q10: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q11: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q12: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q13: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q14: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q15: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q16: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q17: string;

  @ApiProperty({
    description: 'Choice Question (Yes/No)',
    example: 'No',
  })
  @IsNotEmpty()
  q18: string;

  @ApiProperty({
    description: 'Choice Question (Yes/No with Reason)',
    example: 'Yes, I could do ..',
  })
  @IsNotEmpty()
  q19: string;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q20: number;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q21: number;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q22: number;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q23: number;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q24: number;

  @ApiProperty({
    description: 'Custom string',
    example: 'abcd...',
  })
  @IsNotEmpty()
  q25: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'B',
  })
  @IsNotEmpty()
  q26: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q27: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q28: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q29: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @IsNotEmpty()
  q30: string;

  @ApiProperty({
    description: 'name',
    example: 'Saad',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'registrationNo',
    example: 'SE232223',
  })
  @IsNotEmpty()
  registrationNo: string;

  @ApiProperty({
    description: 'yearOfIntake',
    example: '2020',
  })
  @IsNotEmpty()
  yearOfIntake: string;

  @ApiProperty({
    description: 'degreeProgram',
    example: 'SE',
  })
  @IsNotEmpty()
  degreeProgram: string;

  @ApiProperty({
    description: 'yearOfGraduation',
    example: '2024',
  })
  @IsNotEmpty()
  yearOfGraduation: string;

  @ApiProperty({
    description: 'employed',
    example: 'No',
  })
  @IsNotEmpty()
  employed: string;

  @ApiProperty({
    description: 'current Employer',
    example: 'Avanza',
  })
  currentEmployer: string;

  @ApiProperty({
    description: 'position',
    example: 'Sr. Developer',
  })
  position: string;

  @ApiProperty({
    description: 'industry',
    example: 'Information Technology',
  })
  industry: string;

  @ApiProperty({
    description: 'employmentPeriod1',
    example: '2020-12-25 05:00:00',
  })
  employmentPeriod1: Date;

  @ApiProperty({
    description: 'employmentPeriod2',
    example: '2020-12-25 05:00:00',
  })
  employmentPeriod2: Date;

  @ApiProperty({
    description: 'lastSalary',
    example: '240000',
  })
  lastSalary: number;

  @ApiProperty({
    description: 'academicSpecialization',
    example: 'Software Engineer',
  })
  academicSpecialization: string;

  @ApiProperty({
    description: 'professionalSpecialization',
    example: 'Software Engineer',
  })
  professionalSpecialization: string;

  @ApiProperty({
    description: 'firstJobExperienceYear',
    example: '2000',
  })
  firstJobExperienceYear: string;

  @ApiProperty({
    description: 'firstJobEmploymentPeriod1',
    example: '2020-12-25 05:00:00',
  })
  firstJobEmploymentPeriod1: Date;

  @ApiProperty({
    description: 'firstJobEmploymentPeriod2',
    example: '2020-12-25 05:00:00',
  })
  firstJobEmploymentPeriod2: Date;

  @ApiProperty({
    description: 'firstJobSalary',
    example: '24000',
  })
  firstJobSalary: number;

  @ApiProperty({
    description: 'personalEmail',
    example: 'ab@gmail.com',
  })
  @IsNotEmpty()
  personalEmail: string;

  @ApiProperty({
    description: 'mobileContact',
    example: '033392382292',
  })
  @IsNotEmpty()
  mobileContact: string;
}
