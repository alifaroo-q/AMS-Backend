import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { IsEmailAvailable } from './dto/IsEmailAvailable';
import FilesHelper from 'files/FilesHelper';
import { IsUniEmailUnique } from './dto/IsUniEmailUnique';
import { IsPhoneAvailable } from './dto/IsPhoneAvailable';
//import { ProfilesService } from 'src/profiles/profiles.service';
import { Profile } from 'src/profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [UserController],
  providers: [
    UserService,
    IsEmailAvailable,
    IsPhoneAvailable,
    IsUniEmailUnique,
    FilesHelper,
    //ProfilesService,
  ],
  exports: [UserService, IsEmailAvailable], //As we need to use userService in other modules apart from usermodule
})
export class UserModule {}
