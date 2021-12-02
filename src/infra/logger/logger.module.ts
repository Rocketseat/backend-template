import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        name: `${process.env.SERVICE || 'backend'}-logger`,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        redact: ['document', 'email', 'password', 'password_confirmation'],
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  levelFirst: true,
                  translateTime: true,
                },
              }
            : undefined,
      },
    }),
  ],
  providers: [LoggerService],
})
export class LoggerModule {}
