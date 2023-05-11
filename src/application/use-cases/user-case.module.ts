import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';

import { GetUserByEmailUseCase } from './user/get-user-by-email.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [GetUserByEmailUseCase],
  exports: [GetUserByEmailUseCase],
})
export class UseCasesModule {}
