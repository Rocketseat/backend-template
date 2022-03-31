import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import tracer from 'dd-trace';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import { ConfigurationInput, createLightship, Lightship } from 'lightship';

import { LoggerService } from '@infra/logger/logger.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const configuration: ConfigurationInput = {
    detectKubernetes: process.env.NODE_ENV !== 'production' ? false : true,
    port: 9000,
  };

  const lightship: Lightship = await createLightship(configuration);
  const app = await NestFactory.create(AppModule);

  lightship.registerShutdownHandler(() => app.close());

  const LoggerServiceInstance = app.get(LoggerService);

  app.useLogger(LoggerServiceInstance);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.listen(3333).then(() => {
    lightship.signalReady();
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
