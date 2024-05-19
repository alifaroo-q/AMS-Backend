import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { auth } from '@googleapis/oauth2';
import { Options } from 'nodemailer/lib/smtp-transport';

import * as SendGrid from '@sendgrid/mail';

const EMAIL_CONFIRMATION_TEMPLATE: string =
  'd-4759f0a5731b4f2888f92ff24843b719';

@Injectable()
export class MailService {
  private logger = new Logger('MailService');

  constructor(private readonly mailerService: MailerService) {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  private async sendGridMail(mail: SendGrid.MailDataRequired) {
    try {
      return await SendGrid.send(mail);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async sendTestMail() {
    return await this.sendGridMail({
      to: 'alifarooq122@gmail.com',
      subject: 'testing',
      from: 'se201027@dsu.edu.pk',
      templateId: 'd-4759f0a5731b4f2888f92ff24843b719',
      text: 'Test mail',
      html: 'Verify email',
      dynamicTemplateData: {
        token: 'fslkfsjfkls',
        domain: 'dsu.edu.pk',
        username: 'test',
        link: 'dsu.edu.pk',
      },
    });
  }

  private async setTransport() {
    const OAuth2 = auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          //console.log(err);
          reject('Opps Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendMail(to: string) {
    try {
      await this.setTransport();
    } catch (err) {
      console.log(err);
      console.log('Email HALT');
      return;
    }
    this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: 'se201003@dsu.edu.pk,gosaad@outlook.com', //to,
        from: 'DSU Alumni Portal <no-reply@dsu.edu.pk>',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async sendVerificationEmail(to: string, token: string, type: string) {
    try {
      const response = await this.sendGridMail({
        to,
        from: 'se201027@dsu.edu.pk',
        subject:
          type === 'internal'
            ? 'Registration: Alumni Verification'
            : 'Registration: Email Verification',
        templateId: EMAIL_CONFIRMATION_TEMPLATE,
        dynamicTemplateData: {
          token,
          username: 'Alumni Name',
          domain: process.env.DOMAIN || 'https://alumni.dsu.edu.pk',
          link:
            type === 'internal'
              ? '/registrations/validateUniEmail'
              : '/registrations/validateAccountEmail',
        },
      });

      this.logger.log(response);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async sendPasswordConfirmationEmail(to: string, token: string) {
    try {
      await this.setTransport();
    } catch (err) {
      console.log(err);
      console.log('Email HALT');
      return;
    }
    this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to: 'se201003@dsu.edu.pk,gosaad@outlook.com', //to,
        from: 'DSU Alumni Portal <no-reply@dsu.edu.pk>',
        subject: 'Password Change Request Confirmation',
        template: 'AlumniPasswordChange', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          token,
          username: 'Alumni Name',
          domain: process.env.FRONT_DOMAIN || 'https://alumni.dsu.edu.pk',
          link: process.env.FORGOT_PASS_PATH,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// <h1>Hello {{code}}</h1>
// <p>This is my email template - Saad {{username}}</p>
