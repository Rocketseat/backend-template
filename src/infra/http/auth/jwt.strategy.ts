import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { base64Encode } from 'src/utils/base64-encode';

import { AuthUser } from './auth-user';

type Payload = {
  uid: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: base64Encode(process.env.JWT_PUBLIC_KEY),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: Payload): Promise<AuthUser> {
    return { atlasUserId: payload.uid };
  }
}
