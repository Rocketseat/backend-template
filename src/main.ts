import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import tracer from 'dd-trace';
import { LoggerErrorInterceptor } from 'nestjs-pino';

import { LoggerService } from '@infra/logger/logger.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const LoggerServiceInstance = app.get(LoggerService);

  app.useLogger(LoggerServiceInstance);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.listen(3333).then(() => {
    LoggerServiceInstance.log('HTTP server running!');
  });
}

tracer.init({
  service: process.env.SERVICE,
  env: process.env.NODE_ENV,
  version: process.env.VERSION,
  runtimeMetrics: true,
  logInjection: true,
});

bootstrap();
