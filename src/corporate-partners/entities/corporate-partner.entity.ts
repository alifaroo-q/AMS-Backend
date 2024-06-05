import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('corporate-partners')
export class CorporatePartner {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;
}
