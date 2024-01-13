import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy) {
  constructor(private authSerivce: AuthService) {
    super({
      usernameField: 'username',
    });
  }

  validate(username: string, password: string) {
    return this.authSerivce.getAuthenticatedUser(username, password);
  }
}
