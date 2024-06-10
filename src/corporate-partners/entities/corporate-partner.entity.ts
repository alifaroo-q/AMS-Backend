import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('corporate-partners')
export class CorporatePartner {
  @ApiProperty({ description: 'Id', example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the corporate partner',
    example: 'Shan',
  })
  @Column()
  name: string;

  @ApiProperty({ description: 'Corporate partner brand image' })
  @Column()
  image: string;

  @ApiProperty({ description: 'Corporate partner discounted offer' })
  @Column()
  discounted_offer: string;

  @ApiProperty({ description: 'Corporate partner discounted offer valid date' })
  @Column()
  valid_date: Date;
}
