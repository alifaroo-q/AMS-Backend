import { Module } from '@nestjs/common';
import { AlumniCardService } from './alumni-card.service';
import { AlumniCardController } from './alumni-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniCard } from './entities/alumni-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlumniCard])],
  controllers: [AlumniCardController],
  providers: [AlumniCardService],
})
export class AlumniCardModule {}
