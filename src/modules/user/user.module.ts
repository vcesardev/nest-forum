import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UserService],
})
export class UserModule {}
