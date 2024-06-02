import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/users.entity';

@Entity({ name: 'jobs' })
export class Job {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of job',
    example: 'Frontend Developer',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Description of what job is about',
    example: 'frontend developer with experience in react',
  })
  @Column()
  description: string;

  @ApiProperty({ description: 'End date for job application' })
  @Column()
  end_date: Date;

  @ApiProperty({
    description: 'Name of organization for job',
    example: '10Pearls',
  })
  @Column()
  organization_name: string;

  @ApiProperty({
    description: 'Email of organization for job',
    example: 'hr@10pearls.com',
  })
  @Column()
  organization_email: string;

  @ApiProperty({
    description: 'Location of job / organization',
    example: 'Karachi',
  })
  @Column()
  location: string;

  @ApiProperty({ description: 'Salary for the job', example: '50000' })
  @Column()
  salary: string;

  @ApiProperty({
    description: 'Currency of salary',
    example: '$ / Eur / RS',
  })
  @Column()
  salary_type: string;

  @ApiProperty({ description: 'Type of job', example: 'Remote' })
  @Column()
  type: string;

  @ApiProperty({
    description: 'Level of experience for job',
    example: 'Intermediate',
  })
  @Column()
  experience: string;

  @ApiProperty({
    description: 'Time of the job',
    example: 'Full time / Part time / Project based ',
  })
  @Column()
  job_time: string;

  @ApiProperty({
    description: 'Schedule metrics of the job',
    example: 'Per hour / Per week / Per month',
  })
  @Column()
  schedule_metrics: string;

  @ApiProperty({
    description: 'Is the job is approved',
    example: 'true / false',
  })
  @Column({ default: false })
  isApproved: boolean;

  @ApiProperty({
    description: 'Is the job created by admin',
    example: 'true / false',
  })
  @Column({ default: false })
  isCreatedByAdmin: boolean;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
