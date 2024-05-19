import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); //for static image serve
  //const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // {
  //   whitelist: true,
  //   transform: true,
  // }

  // enable DI for class-validator (Important for custom valdation decorators)
  // this is an important step, for further steps in this article
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  /* for Swagger */
  const config = new DocumentBuilder()
    .setTitle('Alumni Example')
    .setDescription('The alumni management system API description')
    .setVersion('1.0')
    .addTag('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /* for Swagger */

  app.useStaticAssets(join(__dirname, '..', '..', 'files')); //for static image serve
  //for static file service
  //http://localhost:3000/alumni/default/avatar.jpg
  //http://localhost:3000/alumni/39/avatar/profilePic.png
  //http://localhost:3000/alumni/39/profileResume/17.pdf
  //http://localhost:3000/alumni/39/skillCertificates/6.png

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
