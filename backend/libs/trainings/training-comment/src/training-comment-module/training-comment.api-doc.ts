import { Comment } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';

export class TrainingCommentApiDoc implements Comment {
  @ApiProperty({
    description: 'ID comment',
    example: '6cd1ef70-c62b-5714-8a1d-4a5548f3942d',
  })
  id: number;

  @ApiProperty({
    description: 'User Id',
    example: '677cd8d75ff92067f1de5911',
  })
  public userId!: string;

  @ApiProperty({
    description: 'ID post',
    example: '45463002-e83e-5024-8fce-974ba5b6e5af',
  })
  public trainingId!: number;

  @ApiProperty({
    description: 'rating',
    example: '5',
  })
  rating: number;

  @ApiProperty({
    description: 'Comment message',
    example: 'Some comment for post',
  })
  public message!: string;

  @ApiProperty({
    description: 'Date of comment',
    example: '2024-02-15T13:43:22+07:00',
  })
  public createdAt!: Date;
}
