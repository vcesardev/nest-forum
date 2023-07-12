import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class PostGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { id } = request.params;

    if (request.user.id !== id) {
      throw new UnauthorizedException("you can't create this post.");
    }

    return true;
  }
}
