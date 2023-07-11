import { Body, Controller, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dtos/IAuthLogin.dto';
import { AuthRegisterDTO } from './dtos/IAuthRegister.dto';
import { IncomingHttpHeaders } from 'http';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthLoginDTO) {
    return await this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: AuthRegisterDTO) {
    return await this.authService.register(data);
  }

  @Post('forgot')
  async forgot() {
    //forgot
  }
  @Post('reset')
  async reset() {
    //reset
  }

  @UseGuards(AuthGuard)
  @Post('check')
  async check(@Headers() headers: IncomingHttpHeaders) {
    const token = headers.authorization.split(' ')[1] || '';
    return await this.authService.checkToken(token);
  }
}
