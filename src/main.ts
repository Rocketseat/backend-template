import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import tracer from 'dd-trace';
import { LoggerErrorInterceptor } from 'nestjs-pino';

import { LoggerService } from '@infra/logger/logger.service';

import { AppModule } from './app.module';
import { ENV, PORT, APP_NAME, APP_VERSION } from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  });

  const LoggerServiceInstance = app.get(LoggerService);

  app.useLogger(LoggerServiceInstance);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  app.listen(PORT).then(() => {
    LoggerServiceInstance.log(`HTTP server running on port ${PORT}!`);
  });
}

tracer.init({
  service: APP_NAME,
  env: ENV,
  version: APP_VERSION,
  runtimeMetrics: true,
  logInjection: true,
});

bootstrap();
