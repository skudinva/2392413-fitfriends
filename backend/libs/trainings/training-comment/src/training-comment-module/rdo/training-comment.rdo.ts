import { Expose } from 'class-transformer';
import { BaseCommentDto } from '../dto/base-comment.dto';

export class TrainingCommentRdo extends BaseCommentDto {
  @Expose()
  public id: number;

  @Expose()
  public userId: string;

  @Expose()
  public trainingId: number;

  @Expose()
  public rating: number;

  @Expose()
  public message: string;

  @Expose()
  public createdAt: Date;
}
