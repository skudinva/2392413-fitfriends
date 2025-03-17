import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TrainingPostRdo {
  @Expose()
  @ApiProperty({
    description: 'trainingId',
    example: '0a7cbc9e-9754-4187-ad0f-5b99d4b0814b',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    description: 'training type',
    example: 'Video',
  })
  postType!: string;

  @Expose()
  @ApiProperty({
    description: 'Author Id',
    example: '999aef3b7eadb76365f3c2cb',
  })
  userId!: string;

  @Expose()
  @ApiProperty({
    description: 'Repost flag',
    example: 'true',
  })
  isRepost!: boolean;

  @Expose()
  @ApiProperty({
    description: 'Source author Id',
    example: '999aef3b7eadb76365f3c2cb',
  })
  originUserId?: string;

  @Expose()
  @ApiProperty({
    description: 'Source training Id',
    example: '0a7cbc9e-9754-4187-ad0f-5b99d4b0814b',
  })
  originPostId?: string;

  @Expose()
  @ApiProperty({
    description: 'Training state',
    example: 'Published',
  })
  state!: string;

  @Expose()
  @ApiProperty({
    description: 'Date of training create',
    example: '2024-11-24T10:42:10+07:00',
  })
  createdAt!: string;

  @Expose()
  @ApiProperty({
    description: 'Date of training publication',
    example: '2024-11-24T10:42:10+07:00',
  })
  publicDate!: string;

  @Expose()
  @ApiProperty({
    description: 'Likes count',
    example: 8,
  })
  likesCount!: number;

  @Expose()
  @ApiProperty({
    description: 'Comments count',
    example: 10,
  })
  commentsCount!: number;

  @Expose()
  comments!: Comment[];
}
