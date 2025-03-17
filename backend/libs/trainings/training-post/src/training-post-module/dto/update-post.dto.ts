import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsISO8601, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsIn(Object.values(PostType))
  @IsOptional()
  @ApiProperty({
    description: 'Training type',
    example: 'Video',
    enum: PostType,
    enumName: 'PostType',
  })
  postType?: PostType;

  userId?: string;

  @IsIn(Object.values(PostState))
  @IsOptional()
  @ApiProperty({
    description: 'Training state',
    example: 'Published',
    enum: PostState,
    enumName: 'PostState',
  })
  state?: PostState;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ description: 'Date of publication' })
  publicDate?: Date;
}
