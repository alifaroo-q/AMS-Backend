import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'registrations' })
export class Registration {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    description: 'University Email / Verification Email',
    example: 'saad.luqman@dsu.edu.pk',
  })
  @Column({ type: 'varchar', length: 200, unique: true })
  uni_email: string;

  @ApiProperty({ description: 'first name', example: 'Syed' })
  @Column()
  first_name: string;

  @ApiProperty({ description: 'middle name', example: 'Saad' })
  @Column()
  middle_name: string;

  @ApiProperty({ description: 'last name', example: 'Luqman' })
  @Column({ nullable: true })
  last_name: string;

  @ApiProperty({ description: 'qualification', example: 'Masters' })
  @Column()
  qualification: string;

  @ApiProperty({ description: 'area', example: 'Computer Science' })
  @Column()
  area: string;

  @ApiProperty({
    description: 'Time of Registration',
    example: '2018-06-01 00:00:00',
  })
  @Column()
  registration_time: Date;

  @ApiProperty({
    description: 'Time of Graduation',
    example: '2022-06-01 00:00:00',
  })
  @Column()
  graduation_time: Date;

  @ApiProperty({ description: 'cgpa', example: '3.7' })
  @Column()
  cgpa: number;

  @ApiProperty({ description: 'Registartion Step', example: '0' })
  @Column({ default: 0 })
  step: number;

  @ApiProperty({
    description: 'uni_token',
    example: '40charsrc92oqaltm6bwgzf1idgon0wiak0u0o64',
  })
  @Column({ length: 40, nullable: true })
  uni_token: string;

  @ApiProperty({ description: 'uni verified', example: 'false' })
  @Column({ default: false })
  uni_verified: boolean;

  @ApiProperty({
    description: 'Count of uni verification email sent',
    example: '0',
  })
  @Column({ default: 0 })
  uni_email_sent: number;

  @ApiProperty({
    description: 'email_token',
    example: '40charsrc92oqaltm6bwgzf1idgon0wiak0u0o64',
  })
  @Column({ length: 40, nullable: true })
  email_token: string;

  @ApiProperty({ description: 'email verified', example: 'false' })
  @Column({ default: false })
  email_verified: boolean;

  @ApiProperty({
    description: 'Count of account verification email sent',
    example: '0',
  })
  @Column({ default: 0 })
  email_sent: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
