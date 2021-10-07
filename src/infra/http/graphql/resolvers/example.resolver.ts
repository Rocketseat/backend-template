import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => String)
export class ExampleResolver {
  @Query((_returns) => String)
  async helloWorld() {
    return 'Hello World!';
  }
}
