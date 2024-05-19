import { ApiProperty } from '@nestjs/swagger';
import { Academic } from 'src/academics/entities/academic.entity';
import { Experience } from 'src/experiences/entities/experience.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//import { IsDate, IsEmail, Min, Max } from 'class-validator';

import { constants } from 'utils/constants';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'Email', example: 'gosaad@outlook.com' })
  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  @ApiProperty({
    description: 'University Email / Verification Email',
    example: 'saad.luqman@dsu.edu.pk',
  })
  @Column({ type: 'varchar', length: 200, unique: true })
  uni_email: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '+92 337033321',
  })
  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone: string;

  @ApiProperty({ description: 'first name', example: 'Syed' })
  @Column()
  first_name: string;

  @ApiProperty({ description: 'middle name', example: 'Saad' })
  @Column()
  middle_name: string;

  @ApiProperty({ description: 'last name', example: 'Luqman' })
  @Column({ nullable: true })
  last_name: string;

  @ApiProperty({ description: 'Password', example: '12345678' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Role', default: 2 })
  @Column({ default: 2 })
  role: number;

  @ApiProperty({ description: 'Registration Status', default: 0 })
  @Column({ default: 0 })
  registration_status: number;

  @ApiProperty({ description: 'Active Status', default: false })
  @Column({ default: false })
  active_status: boolean;

  @ApiProperty({ default: constants.DEFAULT_AVATAR })
  @Column({ default: constants.DEFAULT_AVATAR })
  avatar: string;

  @ApiProperty({
    description: 'password reset token',
    example: '40charsrc92oqaltm6bwgzf1idgon0wiak0u0o64',
  })
  @Column({ length: 40, nullable: true })
  password_reset_token: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToOne(() => Survey, (survey) => survey.user)
  survey: Survey;

  @OneToMany(() => Academic, (academic) => academic.user)
  academics: Academic[];

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];
}
