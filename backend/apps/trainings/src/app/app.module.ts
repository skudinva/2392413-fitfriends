import { TrainingCommentModule } from '@backend/training-comment';
import { TrainingConfigModule } from '@backend/training-config';
import { TrainingLikeModule } from '@backend/training-like';
import { TrainingPostModule } from '@backend/training-post';
import { TrainingTagModule } from '@backend/training-tag';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TrainingPostModule,
    TrainingTagModule,
    TrainingCommentModule,
    TrainingLikeModule,
    TrainingConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
