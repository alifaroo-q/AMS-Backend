import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({
    description: 'Title / Name for the event',
    example: 'Convocation for students',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of what the event is about',
    example: 'convocation for passing out students',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date of event' })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
