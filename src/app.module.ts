import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/posts/post.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => PostModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
