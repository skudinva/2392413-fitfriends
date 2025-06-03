import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

const DefaultPrefix = {
  Global: 'api',
  Specification: 'spec',
} as const;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The «Training» service')
    .setDescription('Training service API')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix(DefaultPrefix.Global);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DefaultPrefix.Specification, app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${DefaultPrefix.Global}`
  );
  Logger.log(
    `🚀 Specification is running on: http://localhost:${port}/${DefaultPrefix.Specification}`
  );
}

bootstrap();
