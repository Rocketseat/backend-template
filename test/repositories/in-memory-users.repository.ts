import { AsyncMaybe } from '@core/logic/Maybe';

import { User } from '@domain/entities/user.entity';

import { UsersRepository } from '@infra/database/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: Array<User> = [];

  async create(user: User): Promise<User> {
    this.items.push(user);

    return user;
  }

  async findByEmail(email: string): AsyncMaybe<User> {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
