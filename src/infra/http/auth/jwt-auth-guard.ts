import { ContextType, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { AuthUser } from '@infra/http/auth/auth-user';
import { IS_PUBLIC_KEY } from '@infra/http/auth/public';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    if (process.env.NODE_ENV === 'test') {
      if (context.getType<ContextType | 'graphql'>() === 'graphql') {
        const ctx = GqlExecutionContext.create(context);

        const atlasUserId =
          ctx.getContext().req.headers['request-atlas-user-id'];

        ctx.getContext().req.user = {
          atlasUserId,
        } as AuthUser;

        return true;
      }

      const request = context.switchToHttp().getRequest();

      request.user = {
        atlasUserId: request.headers['request-atlas-user-id'],
      } as AuthUser;

      return true;
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      return GqlExecutionContext.create(context).getContext().req;
    }

    return context.switchToHttp().getRequest();
  }
}
