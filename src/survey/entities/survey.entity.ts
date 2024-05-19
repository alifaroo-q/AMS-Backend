import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'survey' })
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q1: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q2: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q3: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q4: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q5: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q6: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q7: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q8: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q9: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q10: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q11: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q12: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q13: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q14: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q15: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q16: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q17: string;

  @ApiProperty({
    description: 'Choice Question (Yes/No)',
    example: 'No',
  })
  @Column()
  q18: string;

  @ApiProperty({
    description: 'Choice Question (Yes/No with Reason)',
    example: 'Yes, I could do ..',
  })
  @Column()
  q19: string;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @Column()
  q20: number;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @Column()
  q21: number;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @Column()
  q22: number;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @Column()
  q23: number;

  @ApiProperty({
    description: 'Choice Question (1 to 5)',
    example: '1',
  })
  @Column()
  q24: number;

  @ApiProperty({
    description: 'Custom string',
    example: 'abcd...',
  })
  @Column()
  q25: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'B',
  })
  @Column()
  q26: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q27: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q28: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q29: string;

  @ApiProperty({
    description: 'Choice Question (A to F)',
    example: 'A',
  })
  @Column()
  q30: string;

  @ApiProperty({
    description: 'name',
    example: 'Saad',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'registrationNo',
    example: 'SE232223',
  })
  @Column()
  registrationNo: string;

  @ApiProperty({
    description: 'yearOfIntake',
    example: '2020',
  })
  @Column()
  yearOfIntake: string;

  @ApiProperty({
    description: 'degreeProgram',
    example: 'SE',
  })
  @Column()
  degreeProgram: string;

  @ApiProperty({
    description: 'yearOfGraduation',
    example: '2024',
  })
  @Column()
  yearOfGraduation: string;

  @ApiProperty({
    description: 'employed',
    example: 'No',
  })
  @Column()
  employed: string;

  @ApiProperty({
    description: 'current Employer',
    example: 'Avanza',
  })
  @Column({ nullable: true })
  currentEmployer: string;

  @ApiProperty({
    description: 'position',
    example: 'Sr. Developer',
  })
  @Column({ nullable: true })
  position: string;

  @ApiProperty({
    description: 'industry',
    example: 'Information Technology',
  })
  @Column({ nullable: true })
  industry: string;

  @ApiProperty({
    description: 'employmentPeriod1',
    example: '2020-12-25 05:00:00',
  })
  @Column({ nullable: true })
  employmentPeriod1: Date;

  @ApiProperty({
    description: 'employmentPeriod2',
    example: '2020-12-25 05:00:00',
  })
  @Column({ nullable: true })
  employmentPeriod2: Date;

  @ApiProperty({
    description: 'lastSalary',
    example: '240000',
  })
  @Column({ nullable: true })
  lastSalary: number;

  @ApiProperty({
    description: 'academicSpecialization',
    example: 'Software Engineer',
  })
  @Column({ nullable: true })
  academicSpecialization: string;

  @ApiProperty({
    description: 'professionalSpecialization',
    example: 'Software Engineer',
  })
  @Column({ nullable: true })
  professionalSpecialization: string;

  @ApiProperty({
    description: 'firstJobExperienceYear',
    example: '2000',
  })
  @Column({ nullable: true })
  firstJobExperienceYear: string;

  @ApiProperty({
    description: 'firstJobEmploymentPeriod1',
    example: '2020-12-25 05:00:00',
  })
  @Column({ nullable: true })
  firstJobEmploymentPeriod1: Date;

  @ApiProperty({
    description: 'firstJobEmploymentPeriod2',
    example: '2020-12-25 05:00:00',
  })
  @Column({ nullable: true })
  firstJobEmploymentPeriod2: Date;

  @ApiProperty({
    description: 'firstJobSalary',
    example: '24000',
  })
  @Column({ nullable: true })
  firstJobSalary: number;

  @ApiProperty({
    description: 'personalEmail',
    example: 'ab@gmail.com',
  })
  @Column()
  personalEmail: string;

  @ApiProperty({
    description: 'mobileContact',
    example: '033392382292',
  })
  @Column()
  mobileContact: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
