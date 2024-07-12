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
