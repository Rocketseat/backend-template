import { EmailBadFormattedError } from '@domain/value-objects/errors/email-bad-formatted-error';

import { UsersRepository } from '@infra/database/repositories/users.repository';

import { makeFakeUser } from '@test/factories/users.factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';

import { UserByEmailNotFoundError } from './errors/user-by-email-not-found.error';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';

describe('GetUserByEmailUseCase', () => {
  let usersRepository: UsersRepository;

  let getUserByEmailUseCase: GetUserByEmailUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();

    getUserByEmailUseCase = new GetUserByEmailUseCase(usersRepository);
  });

  it('should be able to get user by email', async () => {
    const user = makeFakeUser();

    await usersRepository.create(user);

    const output = await getUserByEmailUseCase.handle(user.email);

    expect(output.isRight()).toBeTruthy();
    expect(output.value).toEqual(user);
  });

  it('should be able an error is returned in case an invalid email address is provided', async () => {
    const invalidEmail = 'invalid_email';

    const output = await getUserByEmailUseCase.handle(invalidEmail);

    expect(output.isLeft()).toBeTruthy();
    expect(output.value).toBeInstanceOf(EmailBadFormattedError);
  });

  it('should be able to return user not found error', async () => {
    const email = 'oi@rocketseat.com.br';

    const output = await getUserByEmailUseCase.handle(email);

    expect(output.isLeft()).toBeTruthy();
    expect(output.value).toBeInstanceOf(UserByEmailNotFoundError);
  });
});
