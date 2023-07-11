import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthLoginDTO } from './dtos/IAuthLogin.dto';
import { AuthRegisterDTO } from './dtos/IAuthRegister.dto';
import { User } from '../../types/User';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async createToken(user: User) {
    const token = this.jwtService.sign(
      { name: user.name, email: user.email },
      {
        expiresIn: '7 days',
        subject: user.id,
        issuer: 'login',
        audience: 'auth',
      },
    );

    return { accessToken: token, user };
  }

  async checkToken(token: string) {
    try {
      const data = await this.jwtService.verify(token, {
        issuer: 'login',
        audience: 'auth',
      });

      return data;
    } catch (err) {
      throw new BadRequestException('user is invalid.');
    }
  }

  async login(data: AuthLoginDTO) {
    const { email, password } = data;
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail/password are incorrect.');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('E-mail/password are incorrect.');
    }

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    try {
      return await this.userService.create(data);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async forget() {
    //forget
  }

  async reset() {
    //reset
  }
}
