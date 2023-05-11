import { DomainError } from '@core/domain/errors/DomainError';

export class UserByEmailNotFoundError extends Error implements DomainError {
  constructor(email: string) {
    super(`User with email '${email}' was not found.`);
    this.name = 'UserNotFound';
  }
}
