import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // async register(@Body() body){

  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log("request login");
    console.log(req.user);
        //  return req.user;
        return this.authService.login(req.user); // TODO: return JWT access token 
  }
  // @UseGuards(AuthenticatedGuard) if you use session
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req ): string {  // TODO: require an Bearer token, validate token
     return req.user;
  }
  
 
}
