import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@prisma/client';
import {
  IsArray,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Training type',
    example: 'Video',
    enum: PostType,
    enumName: 'PostType',
  })
  @IsIn(Object.values(PostType))
  postType!: PostType;

  @IsString()
  @IsMongoId()
  @ApiProperty({
    description: 'Author id of the post',
    example: '677cd8d75ff92067f1de5911',
  })
  userId!: string;

  @IsOptional()
  @IsString({ each: true })
  //@ArrayMaxSize(FieldValidate.MaxTagCount)
  @IsArray()
  //@Length(FieldValidate.MinTagLength, FieldValidate.MaxTagLength, {each: true,})
  @ApiProperty({
    description: 'List of tags',
    example: ['#sometag1'],
    required: false,
  })
  tags?: string[];

  @IsIn(Object.values(PostState))
  @ApiProperty({
    description: 'Training state',
    example: 'Published',
    enum: PostState,
    enumName: 'PostState',
  })
  state!: PostState;
}
