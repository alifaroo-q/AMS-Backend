import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { IsUniEmailUnique } from './dto/IsUniEmailUnique';
import { DoesUniEmailExists } from './dto/DoesUniEmailExists';
import { IsEmailAvailable } from 'src/users/dto/IsEmailAvailable';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';
import FilesHelper from 'files/FilesHelper';
import { IsPhoneAvailable } from 'src/users/dto/IsPhoneAvailable';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registration, User, Profile])],
  controllers: [RegistrationsController],
  providers: [
    RegistrationsService,
    IsUniEmailUnique,
    DoesUniEmailExists,
    IsEmailAvailable,
    IsPhoneAvailable,
    UserService,
    FilesHelper,
  ],
})
export class RegistrationsModule {}
