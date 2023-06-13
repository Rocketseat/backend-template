import faker from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { Replace } from '@core/logic/Replace';

import { User, UserProps } from '@domain/entities/user.entity';

import { UserMapper } from '@infra/database/prisma/mappers/user.mapper';
import { PrismaService } from '@infra/database/prisma/prisma.service';

type Overrides = Partial<
  Replace<
    UserProps,
    {
      email?: string;
      createdAt?: Date;
    }
  >
>;

export function makeFakeUser(data = {} as Overrides) {
  const email = faker.internet.email();
  const createdAt = faker.date.past();

  const props: UserProps = {
    email: data.email || email,
    createdAt: data.createdAt || createdAt,
  };

  const user = User.create(props);

  return user;
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makeUser(data = {} as Overrides): Promise<User> {
    const user = makeFakeUser(data);

    await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    return user;
  }
}
