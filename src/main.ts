import { join } from 'path';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  // enable DI for class-validator (Important for custom validation decorators)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  /* for Swagger */
  const config = new DocumentBuilder()
    .setTitle('Alumni Example')
    .setDescription('The alumni management system API description')
    .setVersion('1.0')
    .addTag('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  /* for Swagger */

  app.useStaticAssets(join(__dirname, '..', '..', 'files'));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
