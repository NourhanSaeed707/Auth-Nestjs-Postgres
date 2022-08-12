import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { comparedPasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor( 
        private readonly usersService : UsersService,
        private readonly jwtService: JwtService
    ){}
    async validateUser(email: string, pass: string): Promise<User> {
        const users = await this.usersService.findOne(email);
        const matched = await comparedPasswords( pass, users.password);
        // if (users && users.password === pass) {
          if(users && matched ){
          return users;
        }
        return null;
      }
      async login (user: User ){
        const payload = {
          email: user.email,
          sub: user.id
        }
        return {
          access_token: this.jwtService.sign(payload)
        }
      }
      // login(user: User): {access_token: string} {
      //   const payload = {
      //       email: user.email,
      //       sub: user.id
      //   }
      //   return {
      //       access_token: this.jwtService.sign(payload)
      //   }
      // }
      //this method to make sure that token that we recieved is valid
      // async verify (token: string): Promise<User | null > {
      //   const decoded = this.jwtService.verify(token, {
      //       secret: jwtSecret
      //   });
      //   const user = this.usersService.getUserByEmail(decoded.email);
      //   if(!user){
      //       throw new Error('Unable to get user from decoded token.');
      //   }
      //   return user;
      // }
}
