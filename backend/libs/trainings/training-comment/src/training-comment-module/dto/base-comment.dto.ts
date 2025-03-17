import { Comment, EntityConstrain } from '@backend/shared/core';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { TrainingCommentApiDoc } from '../training-comment.api-doc';
import { TrainingCommentValidateMessage } from '../training-comment.constant';

export class BaseCommentDto extends TrainingCommentApiDoc implements Comment {
  @IsNumber()
  public id: number;

  @IsString()
  @IsMongoId({ message: TrainingCommentValidateMessage.InvalidID })
  public userId!: string;

  @IsNumber()
  public trainingId: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(EntityConstrain.feedback.mark.minValue)
  @Max(EntityConstrain.feedback.mark.maxValue)
  public rating: number;

  @IsString()
  @IsNotEmpty({ message: TrainingCommentValidateMessage.MessageIsEmpty })
  @IsString()
  @Length(
    EntityConstrain.feedback.comment.minLength,
    EntityConstrain.feedback.comment.maxLength
  )
  public message!: string;
}
