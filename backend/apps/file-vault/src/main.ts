import { DEFAULT_APPLICATION_PORT } from '@backend/shared/core';
import { Logger } from '@nestjs/common';
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
  const port = process.env.PORT || DEFAULT_APPLICATION_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${DefaultPrefix.Global}`
  );
  Logger.log(
    `🚀 Specification is running on: http://localhost:${port}/${DefaultPrefix.Specification}`
  );
}

bootstrap();
