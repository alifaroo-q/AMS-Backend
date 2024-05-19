import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'experiences' })
export class Experience {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'company', example: 'SPARCO' })
  @Column()
  company: string;

  @ApiProperty({ description: 'designation', example: 'Trainee' })
  @Column()
  designation: string;

  @ApiProperty({ description: 'status', example: 'Contract' })
  @Column()
  status: string;

  @ApiProperty({ description: 'nature of job', example: 'Federal Government' })
  @Column()
  nature_of_job: string;

  @ApiProperty({ description: 'start year', example: '2020-12-25 05:00:00' })
  @Column()
  start_year: Date;

  @ApiProperty({ description: 'end year', example: '2022-11-25 05:10:00' })
  @Column()
  end_year: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
