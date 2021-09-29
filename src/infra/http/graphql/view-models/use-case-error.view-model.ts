import { UseCaseError } from '@application/errors/use-case-error';
import { ApolloError } from 'apollo-server-express';

export class UseCaseErrorViewModel {
  static toGraphQL(error: UseCaseError) {
    return new ApolloError(error.message, error.name);
  }
}
