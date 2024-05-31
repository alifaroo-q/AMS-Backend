import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    description: 'Title / Name for the news',
    example: 'new department announced',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of what the news is about',
    example: 'new department announced at dha suffa',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date of news' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
