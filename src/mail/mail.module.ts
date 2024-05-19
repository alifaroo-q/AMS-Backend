import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Global()
// @Module({
//   imports: [
//     MailerModule.forRoot({
//       transport: 'smtps://user@domain.com:pass@smtp.domain.com',
//       defaults: {
//         from: `"DSU Alumni Portal" <${
//           process.env.MAIL_FROM || 'no-reply@dsu.edu.pk'
//         }>`,
//         //from: '"syed saad" <syed.saad.luqman.1994@gmail.com>',
//       },
//       preview: true,
//       template: {
//         dir: __dirname + '/templates',
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     }),
//   ],
//   providers: [MailService],
//   exports: [MailService],
// })
// export class MailModule {}

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        // transport: {
        //   host: process.env.MAIL_HOST || 'smtp.ethereal.email',
        //   port: parseInt(process.env.MAIL_PORT) || 587,
        //   secure: process.env.MAIL_SECURE == 'true' ? true : false,
        //   auth: {
        //     user: process.env.MAIL_USER || 'hailee.schamberger@ethereal.email',
        //     pass: process.env.MAIL_PASSWORD || 'kMdHkZjVHYFzDGpjz5',
        //   },
        //   //tls: { rejectUnauthorized: false },
        // },
        preview: true,
        defaults: {
          from: `DSU Alumni Portal <${
            process.env.MAIL_FROM || 'no-reply@dsu.edu.pk'
          }>`,
          //from: '"syed saad" <syed.saad.luqman.1994@gmail.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

// import { Global, Module } from '@nestjs/common';
// import { MailService } from './mail.service';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { ConfigService } from '@nestjs/config';

// @Global()
// @Module({
//   imports: [
//     MailerModule.forRootAsync({
//       useFactory: async (config: ConfigService) => ({
//         //transport: 'smtps://user@domain.com:pass@smtp.domain.com',
//         transport: {
//           host: process.env.MAIL_HOST || 'smtp.gmail.com',
//           auth: {
//             user: process.env.MAIL_USER || 'syed.saad.luqman.1994@gmail.com',
//             pass: process.env.MAIL_PASSWORD || 'developer12345',
//           },
//         },
//         preview: true,
//         defaults: {
//           from: `"DSU Alumni Portal" <${
//             process.env.MAIL_FROM || 'syed.saad.luqman.1994@gmail.com'
//           }>`,
//           //from: '"syed saad" <syed.saad.luqman.1994@gmail.com>',
//         },
//         template: {
//           dir: __dirname + '/templates',
//           adapter: new HandlebarsAdapter(),
//           options: {
//             strict: true,
//           },
//         },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   providers: [MailService],
//   exports: [MailService],
// })
// export class MailModule {}
