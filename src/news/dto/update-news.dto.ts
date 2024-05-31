import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsDto {
  @ApiProperty({
    description: 'Title / Name for the news',
    example: 'new department announced',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of what the news is about',
    example: 'new department announced at dha suffa',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date of news' })
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
