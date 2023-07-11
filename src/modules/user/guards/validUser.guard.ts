import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../../../types/User';

@Injectable()
export class ValidUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request.user.role === Role.Admin) {
      return true;
    }

    const { id } = request.params;

    if (request.user.id !== id) {
      throw new UnauthorizedException(
        "your user can't access this information.",
      );
    }

    return true;
  }
}
