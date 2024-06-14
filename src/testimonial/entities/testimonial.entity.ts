import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';

@Entity('testimonials')
export class Testimonial {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'first name of alumni', example: 'Ali' })
  @Column()
  first_name: string;
  @ApiProperty({ description: 'Middle name of alumni', example: ' ' })
  @Column()
  middle_name: string;
  @ApiProperty({ description: 'Last name of alumni', example: 'Farooq' })
  @Column()
  last_name: string;
  @ApiProperty({
    description: 'Designation of alumni',
    example: 'Backend Engineer',
  })
  @Column()
  designation: string;
  @ApiProperty({ description: 'Company of alumni', example: 'System Limited' })
  @Column()
  company: string;
  @ApiProperty({ description: 'Year of graduation', example: '2024' })
  @Column()
  class_year: number;
  @ApiProperty({
    description: 'Department of alumni',
    example: 'Software Engineering',
  })
  @Column()
  department: string;
  @ApiProperty({ description: 'Profile pic of alumni', example: 'profile.png' })
  @Column()
  avatar: string;
  @ApiProperty({
    description: 'Testimony from alumni',
    example: 'Medium to long testimony from alumni about dsu',
  })
  @Column()
  testimony: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
