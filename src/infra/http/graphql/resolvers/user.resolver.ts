import { Args, Query, Resolver } from '@nestjs/graphql';

import { GetUserByEmailUseCase } from '@application/use-cases/user/get-user-by-email.use-case';

import { User } from '../dto/models/user.model';
import { UseCaseErrorViewModel } from '../view-models/use-case-error.view-model';
import { UserViewModel } from '../view-models/user.view-model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly getUserByEmailUseCase: GetUserByEmailUseCase) {}

  @Query((_returns) => User)
  async userByEmail(@Args('email') email: string) {
    const output = await this.getUserByEmailUseCase.handle(email);

    if (output.isLeft()) {
      return UseCaseErrorViewModel.toGraphQL(output.value);
    }

    return UserViewModel.toGraphQL(output.value);
  }
}
