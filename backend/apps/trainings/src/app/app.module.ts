import { TrainingModule } from '@backend/training';
import { TrainingCommentModule } from '@backend/training-comment';
import { TrainingConfigModule } from '@backend/training-config';
import { TrainingOrderModule } from '@backend/training-order';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TrainingModule,
    TrainingCommentModule,
    TrainingOrderModule,
    TrainingConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
