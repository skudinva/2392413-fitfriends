import { DEFAULT_APPLICATION_PORT } from '@backend/shared/core';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const DefaultPrefix = {
  Global: 'api',
  Specification: 'spec',
} as const;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(DefaultPrefix.Global);
  const port = process.env.PORT || DEFAULT_APPLICATION_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${DefaultPrefix.Global}`
  );
}

bootstrap();
