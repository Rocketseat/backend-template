import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field((_type) => Int)
  @Min(0)
  offset = 0;

  @Field((_type) => Int)
  @Min(0)
  @Max(20)
  limit = 10;
}
