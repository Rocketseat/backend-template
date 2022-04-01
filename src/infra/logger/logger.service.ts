import { Inject, Injectable } from '@nestjs/common';
import type { Params } from 'nestjs-pino';
import { Logger, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerService extends Logger {
  public constructor(
    logger: PinoLogger,
    @Inject(PARAMS_PROVIDER_TOKEN) params: Params,
  ) {
    super(logger, params);
  }
}
