import { Module } from '@nestjs/common';

import { HttpModule } from '@infra/http/http.module';
// import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [
    // DatabaseModule,
    HttpModule,
  ],
})
export class InfraModule {}
