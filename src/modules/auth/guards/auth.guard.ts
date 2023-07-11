import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    const token = (authorization || '').split(' ')[1];

    try {
      const data = await this.authService.checkToken(token);

      const user = await this.userService.findById(data.sub);

      request.user = user;
      request.tokenPayload = data;

      return true;
    } catch (err) {
      throw new BadRequestException('invalid token');
    }
  }
}
