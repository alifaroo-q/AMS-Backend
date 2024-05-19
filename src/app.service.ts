import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  //constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // sendMail(): void {
  //   this.mailerService.sendMail({
  //     to: 'saad90@mailinator.com',
  //     from: 'sadu@mailinator.com',
  //     subject: 'Testing..',
  //     text: 'welcome',
  //     html: '<b>Welcome, sending email via nodejs</b>',
  //   });
  // }
}
