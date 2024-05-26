import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { ApplyResetPasswordDto } from './auth/dto/apply-reset-password.dto';
import { LoginDto } from './auth/dto/login.dto';
import { ResetPasswordDto } from './auth/dto/reset-password.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { MailService } from './mail/mail.service';

// const user = {
//   sub: 39,
//   name: 'TestF TM TLast',
//   status: 'verified',
//   id: 39,
//   email: 'test@tt.tt',
//   first_name: 'TestF',
//   middle_name: 'TM',
//   last_name: 'TLast',
//   password: 'tttt',
//   role: 2,
//   avatar: '39/1685824482298-Capture.PNG',
//   createdAt: '2023-06-03T20:32:59.605Z',
//   updatedAt: '2023-06-03T20:34:42.000Z',
//   profile: null,
// };

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    description: 'Profile by Id',
    type: typeof { message: 'asda' },
  })
  @ApiBadRequestResponse({
    description: 'Authentication Failed',
  })
  login(
    @Req() req: Request,
    @Body() loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Post('applyPasswordReset')
  @ApiOkResponse({
    description: 'Reset Password',
    type: Promise<{ reset_token: string }>,
  })
  applyResetPassword(@Body() applyPasswordReset: ApplyResetPasswordDto) {
    return this.authService.applyResetPassword(applyPasswordReset);
  }

  @Post('resetPassword')
  @ApiOkResponse({
    description: 'Reset Password',
    type: typeof true,
  })
  resetPassword(
    @Query('token') token: string,
    @Body() resetPassDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, resetPassDto);
  }

  //GET /protected (after login & if not login show error)
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req: any): any {
    const user = req.user;
    console.log(user);
    const { sub, eml, sys, sts, iat, exp, role } = user;
    return { sub, eml, sys, sts, iat, exp, role };
  }

  @Get()
  main() {
    return `This is a deployed Service for Alumni Management System,
    " https://ams-service-production.up.railway.app/api " 
    is no longer active, the new root url is : => 
    " https://amsbackend-ghub.onrender.com/api "`;
  }

  @Post('sendMail/:email')
  sendMail(@Param('email') email: string) {
    return this.mailService.sendPasswordConfirmationEmail(
      'alifarooq122@gmail.com',
      'lksfjsklfjsf',
    );
  }
}
