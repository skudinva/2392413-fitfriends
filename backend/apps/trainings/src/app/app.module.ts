import { TrainingModule } from '@backend/training';
import { TrainingCommentModule } from '@backend/training-comment';
import { TrainingConfigModule } from '@backend/training-config';
import { Module } from '@nestjs/common';

@Module({
  imports: [TrainingModule, TrainingCommentModule, TrainingConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
