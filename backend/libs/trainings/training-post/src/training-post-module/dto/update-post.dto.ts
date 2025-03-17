import { ApiProperty } from '@nestjs/swagger';
import { PostState, PostType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PostExtraPropertyDto } from './post-extra-property.dto';
import { IsValidPostCombination } from './valid-post-property';

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

  @IsOptional()
  @IsString({ each: true })
  //@ArrayMaxSize(FieldValidate.MaxTagCount)
  @IsArray()
  //@Length(FieldValidate.MinTagLength, FieldValidate.MaxTagLength, {
  //  each: true,
  //})
  @ApiProperty({
    description: 'List of tags',
    example: ['#sometag1'],
  })
  tags?: string[];

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

  @ValidateNested()
  @IsOptional()
  @Type(() => PostExtraPropertyDto)
  @IsValidPostCombination({
    message: 'Invalid combination of PostType',
  })
  @ApiProperty()
  extraProperty?: PostExtraPropertyDto;
}
