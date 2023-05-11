import { Injectable } from '@nestjs/common';

import { AsyncMaybe } from '@core/logic/Maybe';

import { User } from '@domain/entities/user.entity';

@Injectable()
export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): AsyncMaybe<User>;
}
