import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtSecret } from './constants';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // this tell that we want auth token from header of request
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

//   async validate(payload: any) {
//     return { userId: payload.sub, email: payload.email };
//   }
  async validate(validationPayload: { email: string, sub: string}): Promise<User | null>{
      return await this.userService.findOne(validationPayload.email);
  }
}