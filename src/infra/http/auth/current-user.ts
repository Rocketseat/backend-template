import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthUser } from '@infra/http/auth/auth-user';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUser => {
    return context.switchToHttp().getRequest().user;
  },
);
