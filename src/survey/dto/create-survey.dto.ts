import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateSurveyDto {
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
  q20: string;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q21: string;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q22: string;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q23: string;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @IsNotEmpty()
  q24: string;

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
}
