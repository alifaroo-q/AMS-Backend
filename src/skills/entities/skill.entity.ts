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

@Entity({ name: 'skills' })
export class Skill {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ description: 'main category', example: 'Software' })
  @Column()
  category: string;

  @ApiProperty({ description: 'sub category', example: 'Web Development' })
  @Column()
  sub_category: string;

  @ApiProperty({ description: 'tags', example: 'MERN Stack,CSS,HTML,JS,REACT' })
  @Column()
  tags: string;

  @ApiProperty({ description: 'expert level', nullable: true })
  @Column()
  level: number;

  @ApiProperty({ description: 'has certificate', nullable: true })
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
