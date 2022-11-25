import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import tracer from 'dd-trace';
import { ConfigurationInput, createLightship, Lightship } from 'lightship';
import { LoggerErrorInterceptor } from 'nestjs-pino';

import { LoggerService } from '@infra/logger/logger.service';

import { AppModule } from './app.module';
import { ENV, PORT, SERVICE, VERSION } from './config/app';

async function bootstrap() {
  const configuration: ConfigurationInput = {
    detectKubernetes: ENV !== 'production' ? false : true,
    gracefulShutdownTimeout: 30 * 1000,
    port: 9000,
  };

  const lightship: Lightship = await createLightship(configuration);

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  lightship.registerShutdownHandler(() => app.close());

  const LoggerServiceInstance = app.get(LoggerService);

  app.useLogger(LoggerServiceInstance);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  app.listen(PORT).then(() => {
    lightship.signalReady();
    LoggerServiceInstance.log('HTTP server running!');
  });
}

tracer.init({
  service: SERVICE,
  env: ENV,
  version: VERSION,
  runtimeMetrics: true,
  logInjection: true,
});

bootstrap();
