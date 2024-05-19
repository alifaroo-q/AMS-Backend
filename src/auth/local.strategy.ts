import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      //passwordField: 'password'
    }); // here is to add config for passport strategies
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('running Validate..');
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log('Some Error!');
      throw new UnauthorizedException();
    }
    return user;
  }
}
