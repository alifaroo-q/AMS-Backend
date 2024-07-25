import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { User } from '../users/entities/users.entity';
import { AppliedJob } from './entities/applied-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User, AppliedJob])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
