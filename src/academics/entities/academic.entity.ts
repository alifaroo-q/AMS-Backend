import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'academics' })
export class Academic {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'qualification type', example: 'Degree' })
  @Column()
  qualification_type: string;

  @ApiProperty({ description: 'qualification', example: 'Masters' })
  @Column()
  qualification: string;

  @ApiProperty({ description: 'area', example: 'Computer Science' })
  @Column({ nullable: true })
  area: string;

  @ApiProperty({ description: 'institute', example: 'DHA Suffa University' })
  @Column()
  institute: string;

  @ApiProperty({ description: 'institute address', example: 'KHI Branch' })
  @Column({ nullable: true })
  institute_address: string;

  @ApiProperty({ description: 'start year', example: '2020-12-25 05:00:00' })
  @Column()
  start_year: Date;

  @ApiProperty({ description: 'end year', example: '2022-11-25 05:10:00' })
  @Column()
  end_year: Date;

  @ApiProperty({ description: 'score', example: '3.7' })
  @Column({ nullable: true })
  score: string;

  @ApiProperty({ description: 'score unit', example: 'cgpa' })
  @Column({ nullable: true })
  score_unit: string;

  @ApiProperty({ description: 'status', example: 'Completed' })
  @Column()
  status: string;

  @ApiProperty({
    description: 'has certificate',
    nullable: true,
    default: false,
  })
  @Column()
  has_certificate: boolean;

  @ApiProperty({ description: 'certificate', nullable: true })
  @Column({ nullable: true })
  certificate: string;

  @ApiProperty({ description: 'certificate link', nullable: true })
  @Column({ nullable: true })
  certificate_link: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
