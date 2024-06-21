import { Module } from '@nestjs/common';
import { AlumniCardService } from './alumni-card.service';
import { AlumniCardController } from './alumni-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniCard } from './entities/alumni-card.entity';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlumniCard, User])],
  controllers: [AlumniCardController],
  providers: [AlumniCardService],
})
export class AlumniCardModule {}
