import { RequestIdInterceptor } from '@backend/interceptors';
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
    .setTitle('FitFriends app')
    .setDescription('FitFriends app API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer `,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
      },
      'accessToken'
    )
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer `,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
      },
      'refreshToken'
    )
    .build();
  app.enableCors();
  app.setGlobalPrefix(DefaultPrefix.Global);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DefaultPrefix.Specification, app, document);
  app.useGlobalInterceptors(new RequestIdInterceptor());
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
