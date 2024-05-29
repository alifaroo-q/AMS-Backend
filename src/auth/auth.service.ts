import { BadRequestException, Injectable } from '@nestjs/common';
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
      const { password, ...remainingProperties } = user;
      return remainingProperties;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      sys: 'AMS',
      role_id: user.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async applyResetPassword(applyPasswordReset: ApplyResetPasswordDto) {
    const user = await this.userService.findByEmail(applyPasswordReset.email);
    const token = this.genToken(40);

    await this.mailService.sendPasswordConfirmationEmail(user.email, token);
    await this.userService.updatePasswordToken(user.id, token);

    return {
      message: 'Password Reset Request Sent',
    };
  }

  async resetPassword(token: string, resetPassDto: ResetPasswordDto) {
    const user = await this.userService.findByToken(token);

    if (!user)
      throw new BadRequestException('User not found with token: ' + token);

    return await this.userService.updatePassword(
      user.id,
      resetPassDto.password,
    );
  }

  genToken(size: number) {
    const rand = () => Math.random().toString(36).substring(2);
    const token = (length: number) =>
      (rand() + rand() + rand() + rand()).substring(0, length);
    return token(size);
  }
}
