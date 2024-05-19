import { ApiProperty } from '@nestjs/swagger';
import { MinDate } from 'class-validator';
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

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'date of birth', example: '2020-12-25 05:00:00' })
  @Column()
  //@MinDate(new Date('2020-12-25')) //--- have to use validate method for it
  date_of_birth: Date;

  @ApiProperty({ description: 'country', example: 'Pakistan' })
  @Column()
  country: string;

  @ApiProperty({ description: 'Timezone', example: 'GMT+5' })
  @Column()
  timezone: string;

  @ApiProperty({ description: 'Resume' })
  @Column({
    nullable: true,
  })
  resume: string;

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
