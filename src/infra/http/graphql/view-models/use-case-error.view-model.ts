import { ApolloError } from 'apollo-server-express';

import { UseCaseError } from '@application/errors/use-case-error';

export class UseCaseErrorViewModel {
  static toGraphQL(error: UseCaseError) {
    return new ApolloError(error.message, error.name);
  }
}
