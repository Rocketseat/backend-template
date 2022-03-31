import { Module } from '@nestjs/common';
import { ServerResponse } from 'http';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        name: `${process.env.SERVICE || 'backend'}-logger`,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        customLogLevel: (res: ServerResponse) => {
          switch (true) {
            case res.statusCode >= 500:
              return 'fatal';
            case res.statusCode >= 400:
              return 'error';
            default:
              return 'info';
          }
        },
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
