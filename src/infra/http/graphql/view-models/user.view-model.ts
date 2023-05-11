import { User as UserEntity } from '@domain/entities/user.entity';

import { User } from '../dto/models/user.model';

export class UserViewModel {
  static toGraphQL(user: UserEntity): User {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}
