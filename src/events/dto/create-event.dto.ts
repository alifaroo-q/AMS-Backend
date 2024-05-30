import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Title / Name for the event',
    example: 'Convocation for students',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of what the event is about',
    example: 'convocation for passing out students',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date of event' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
