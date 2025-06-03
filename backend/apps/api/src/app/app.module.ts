import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClient } from './app.config';
import { AppService } from './app.service';
import { CommentController } from './comment.controller';
import { FriendsController } from './friend.controller';
import { CheckAuthForceGuard } from './guards/check-auth-force.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { OrderController } from './order.controller';
import { TrainingController } from './training.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirectCount,
    }),
  ],
  controllers: [
    UsersController,
    TrainingController,
    CommentController,
    OrderController,
    FriendsController,
  ],
  providers: [CheckAuthGuard, CheckAuthForceGuard, AppService],
})
export class AppModule {}
