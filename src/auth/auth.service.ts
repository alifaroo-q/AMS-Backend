import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ApplyResetPasswordDto } from './dto/apply-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      //name: [user.first_name, user.middle_name, user.last_name].join(' '),
      sub: user.id,
      email: user.email,
      sys: 'AMS',
      //iat: date.getTime(), by default its added in payload
      //exp: date.getTime() + 5 * 24 * 60 * 60 * 1000, by default its added in payload
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async applyResetPassword(applyPasswordReset: ApplyResetPasswordDto) {
    const user = await this.userService.findByEmail(applyPasswordReset.email);
    const my_token = this.genToken(40);
    console.log('Waiting..');
    await this.mailService.sendPasswordConfirmationEmail(user.email, my_token);
    this.userService.updatePasswordToken(user.id, my_token);
    return {
      message: 'Password Reset Request Sent',
    };
  }

  async resetPassword(token: string, resetPassDto: ResetPasswordDto) {
    const user = await this.userService.findByToken(token);
    if (user) {
      let res = await this.userService.updatePassword(
        user.id,
        resetPassDto.password,
      );
      return res;
    } else
      throw new HttpException(
        'User not found with token: ' + token,
        HttpStatus.BAD_REQUEST,
      );
  }

  genToken(size: number) {
    const rand = () => Math.random().toString(36).substring(2);
    const token = (length: number) =>
      (rand() + rand() + rand() + rand()).substring(0, length);
    return token(size);
  }
}
