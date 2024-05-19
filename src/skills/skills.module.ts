import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { User } from 'src/users/entities/users.entity';
import FilesHelper from 'files/FilesHelper';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, User])],
  controllers: [SkillsController],
  providers: [SkillsService, FilesHelper],
  exports: [SkillsService], //As we need to use skillService in interceptors
})
export class SkillsModule {}
