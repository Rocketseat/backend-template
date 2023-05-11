import { Entity } from '@core/domain/Entity';
import { Replace } from '@core/logic/Replace';

export type UserProps = {
  email: string;
  createdAt: Date;
};

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Replace<
      UserProps,
      {
        createdAt?: Date;
      }
    >,
    id?: string,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return user;
  }
}
