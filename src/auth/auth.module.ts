import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import FilesHelper from 'files/FilesHelper';
import { User } from 'src/users/entities/users.entity';
import { UserModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { DoesEmailExist } from './dto/DoesEmailExists';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'ENV.FILE.SECRET',
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    DoesEmailExist,
    FilesHelper,
  ],
  exports: [AuthService],
})
export class AuthModule {}
