import { DomainError } from '@core/domain/errors/DomainError';

export class EmailBadFormattedError extends Error implements DomainError {
  constructor(email: string) {
    super(`The email '${email}' is bad formatted.`);
    this.name = 'EmailBadFormatted';
  }
}
