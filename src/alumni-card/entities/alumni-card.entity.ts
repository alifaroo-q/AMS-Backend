import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('alumni_card')
export class AlumniCard {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'if the alumni card is ready to be collected',
    example: 'true / false',
  })
  @Column({ default: false })
  isApproved: boolean;

  @ApiProperty({
    description: 'if the alumni request for alumni card',
    example: 'true /false',
  })
  @Column({ default: false })
  isRequested: boolean;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
