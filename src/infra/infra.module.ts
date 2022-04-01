import { Module } from '@nestjs/common';

// import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { LoggerModule } from '@infra/logger/logger.module';

@Module({
  imports: [
    // DatabaseModule,
    HttpModule,
    LoggerModule,
  ],
})
export class InfraModule {}
