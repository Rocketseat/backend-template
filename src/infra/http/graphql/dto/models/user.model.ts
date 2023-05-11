import { Injectable } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Paginated } from '../../common/dto/models/paginated';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  createdAt: Date;
}

@Injectable()
export class PaginatedUsers extends Paginated(User) {}
