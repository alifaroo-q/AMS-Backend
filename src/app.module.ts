import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AcademicsModule } from './academics/academics.module';
import { User } from './users/entities/users.entity';
import { Academic } from './academics/entities/academic.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { Profile } from './profiles/entities/profile.entity';
import { ConfigModule } from '@nestjs/config';
import { SkillsModule } from './skills/skills.module';
import { Skill } from './skills/entities/skill.entity';
import { ExperiencesModule } from './experiences/experiences.module';
import { Experience } from './experiences/entities/experience.entity';
import { MailModule } from './mail/mail.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { Registration } from './registrations/entities/registration.entity';
import { SurveyModule } from './survey/survey.module';
import { Survey } from './survey/entities/survey.entity';
import { DoesEmailExist } from './auth/dto/DoesEmailExists';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME || 'ams_dev',
      entities: [
        User,
        Academic,
        Profile,
        Skill,
        Experience,
        Survey,
        Registration,
        Event,
        News,
        Job,
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    AcademicsModule,
    ProfilesModule,
    SkillsModule,
    ExperiencesModule,
    MailModule,
    RegistrationsModule,
    SurveyModule,
    EventsModule,
    NewsModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
