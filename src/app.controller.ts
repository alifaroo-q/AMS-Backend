import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
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
}
