import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { constants } from '../../../utils/constants';

@Entity({ name: 'events' })
export class Event {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title / Name for the event',
    example: 'Convocation for students',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Description of what the event is about',
    example: 'convocation for passing out students',
  })
  @Column()
  description: string;

  @ApiProperty({ description: 'Date of event' })
  @Column()
  date: Date;

  @ApiProperty({ default: constants.DEFAULT_EVENT })
  @Column('text', { array: true })
  event_images: string[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
