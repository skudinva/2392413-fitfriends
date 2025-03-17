import { TrainingCommentModule } from '@backend/training-comment';
import { TrainingConfigModule } from '@backend/training-config';
import { TrainingPostModule } from '@backend/training-post';
import { Module } from '@nestjs/common';

@Module({
  imports: [TrainingPostModule, TrainingCommentModule, TrainingConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
