import { Module } from '@nestjs/common';
import { CorporatePartnersService } from './corporate-partners.service';
import { CorporatePartnersController } from './corporate-partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorporatePartner } from './entities/corporate-partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CorporatePartner])],
  controllers: [CorporatePartnersController],
  providers: [CorporatePartnersService],
})
export class CorporatePartnersModule {}
