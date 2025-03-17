import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { TrainingCommentValidateMessage } from '../training-comment.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: TrainingCommentValidateMessage.MessageIsEmpty })
  @ApiProperty({
    description: 'Comment message',
    example: 'Some comment for post',
  })
  @IsString()
  // @Length(FieldValidate.MinCommentLength, FieldValidate.MaxCommentLength)
  public message!: string;

  @IsString()
  @IsMongoId({ message: TrainingCommentValidateMessage.InvalidID })
  @ApiProperty({
    description: 'User Id',
    example: '677cd8d75ff92067f1de5911',
  })
  public userId!: string;
}
