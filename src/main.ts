import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { LoggerService } from '@infra/logger/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const LoggerServiceInstance = app.get(LoggerService);

  app.useLogger(LoggerServiceInstance);
  app.useGlobalPipes(new ValidationPipe());

  app.listen(3333).then(() => {
    LoggerServiceInstance.log('HTTP server running!');
  });
}

bootstrap();
