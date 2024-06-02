import { Injectable, Logger } from '@nestjs/common';

import * as SendGrid from '@sendgrid/mail';

const EMAIL_CONFIRMATION_TEMPLATE = 'd-4759f0a5731b4f2888f92ff24843b719';
const PASSWORD_CHANGE_TEMPLATE = 'd-8fb05ae60f064c408b20b25df31101a7';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);

  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  private async sendGridMail(mail: SendGrid.MailDataRequired) {
    try {
      return await SendGrid.send(mail);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async sendVerificationEmail(to: string, token: string, type: string) {
    try {
      const response = await this.sendGridMail({
        to,
        from: process.env.MAIL_FROM,
        subject:
          type === 'internal'
            ? 'Registration: Alumni Verification'
            : 'Registration: Email Verification',
        templateId: EMAIL_CONFIRMATION_TEMPLATE,
        html: 'Email Confirmation',
        dynamicTemplateData: {
          token,
          username: 'Alumni Name',
          domain: process.env.DOMAIN || 'https://alumni.dsu.edu.pk',
          link:
            type === 'internal'
              ? '/api/registrations/validateUniEmail'
              : '/api/registrations/validateAccountEmail',
        },
      });

      this.logger.log(response);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async sendPasswordConfirmationEmail(to: string, token: string) {
    try {
      const response = await this.sendGridMail({
        to,
        from: process.env.MAIL_FROM,
        subject: 'Password Change Request Confirmation',
        templateId: PASSWORD_CHANGE_TEMPLATE,
        html: 'Password Change Confirmation',
        dynamicTemplateData: {
          token,
          username: 'Alumni Name',
          domain: process.env.FRONT_DOMAIN || 'https://alumni.dsu.edu.pk',
          link: process.env.FORGOT_PASS_PATH,
        },
      });

      this.logger.log(response);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
