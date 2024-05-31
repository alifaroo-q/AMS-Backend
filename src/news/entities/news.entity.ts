import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { constants } from '../../../utils/constants';

@Entity({ name: 'news' })
export class News {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title / Name for the news',
    example: 'New department announced',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Description of what the news is about',
    example: 'new department announced at dha suffa',
  })
  @Column()
  description: string;

  @ApiProperty({ description: 'Date of news' })
  @Column()
  date: Date;

  @ApiProperty({ default: constants.DEFAULT_NEWS })
  @Column({ default: constants.DEFAULT_NEWS })
  news_image: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: number;
}
