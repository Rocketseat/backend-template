import { Prisma, User as RawUser } from '@prisma/client';

import { User } from '@domain/entities/user.entity';

export class UserMapper {
  static toDomain(raw: RawUser): User {
    const user = User.create({
      email: raw.email,
      createdAt: raw.created_at,
    });

    return user;
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      email: user.email,
      created_at: user.createdAt,
    };
  }
}
