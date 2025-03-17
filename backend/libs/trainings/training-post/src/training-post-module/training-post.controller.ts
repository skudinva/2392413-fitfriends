import { fillDto } from '@backend/helpers';
import { SortDirection, SortType } from '@backend/shared/core';
import { TrainingLikeService } from '@backend/training-like';
import { TrainingNotifyService } from '@backend/training-notify';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserIdDto } from './dto/user-id.dto';
import { TrainingPostWithPaginationRdo } from './rdo/training-post-with-pagination.rdo';
import { TrainingPostRdo } from './rdo/training-post.rdo';
import { TrainingPostResponse } from './training-post.constant';
import { TrainingPostQuery } from './training-post.query';
import { TrainingPostService } from './training-post.service';

@Controller('trainings')
export class TrainingPostController {
  constructor(
    private readonly trainingPostService: TrainingPostService,
    private readonly trainingLikeService: TrainingLikeService,
    private readonly notifyService: TrainingNotifyService
  ) {}

  @Get('/:id/:userId')
  @ApiResponse({
    type: TrainingPostRdo,
    status: HttpStatus.OK,
    description: TrainingPostResponse.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingPostResponse.PostNotFound,
  })
  @ApiTags('training post')
  public async show(@Param('id') id: string, @Param('userId') userId: string) {
    const training = await this.trainingPostService.getPost(id, userId);
    return fillDto(TrainingPostRdo, training.toPOJO());
  }

  @Get('/')
  @ApiResponse({
    type: TrainingPostWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingPostResponse.PostsFound,
  })
  @ApiTags('training post')
  public async index(@Query() query: TrainingPostQuery) {
    const postsWithPagination = await this.trainingPostService.getPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((training) =>
        training.toPOJO()
      ),
    };
    return fillDto(TrainingPostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: TrainingPostRdo,
    status: HttpStatus.CREATED,
    description: TrainingPostResponse.PostCreated,
  })
  @Post('/')
  @ApiTags('training post')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.trainingPostService.createPost(dto);
    return fillDto(TrainingPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    type: TrainingPostRdo,
    status: HttpStatus.CREATED,
    description: TrainingPostResponse.PostCreated,
  })
  @Post('/repost/:trainingId')
  @ApiTags('training post')
  public async createRepost(
    @Param('trainingId') trainingId: string,
    @Body() { userId }: UserIdDto
  ) {
    const newPost = await this.trainingPostService.createRepost(
      trainingId,
      userId
    );

    return fillDto(TrainingPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingPostResponse.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingPostResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingPostResponse.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingPostResponse.AccessDeny,
  })
  @Delete('/:trainingId/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('training post')
  public async destroy(
    @Param('trainingId') trainingId: string,
    @Param('userId') userId: string
  ) {
    await this.trainingPostService.deletePost(trainingId, userId);
  }

  @ApiResponse({
    type: TrainingPostRdo,
    status: HttpStatus.OK,
    description: TrainingPostResponse.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingPostResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingPostResponse.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingPostResponse.AccessDeny,
  })
  @Patch('/:id')
  @ApiTags('training post')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.trainingPostService.updatePost(id, dto);
    return fillDto(TrainingPostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingPostResponse.Like,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingPostResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingPostResponse.LikeAlreadyExists,
  })
  @Post('like/:trainingId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('training like')
  public async addLike(
    @Param('trainingId') trainingId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.trainingLikeService.like({ trainingId, userId });
    await this.trainingPostService.updateCommentCount(trainingId, 1);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingPostResponse.UnLike,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingPostResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingPostResponse.LikeNotExists,
  })
  @Post('unlike/:trainingId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('training like')
  public async deleteLike(
    @Param('trainingId') trainingId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.trainingLikeService.unlike({ trainingId, userId });
    await this.trainingPostService.updateCommentCount(trainingId, -1);
  }

  @Post('sendNewPostNotify')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('training post')
  public async sendNewPostNotify(@Body() dto: UserIdDto) {
    const query = new TrainingPostQuery();
    query.userId = dto.userId;
    query.sortBy = SortType.DATE;
    query.sortDirection = SortDirection.Desc;
    const { entities } = await this.trainingPostService.getPosts(query);

    this.notifyService.sendNewPostNotify(
      entities.map((training) => training.toPOJO()),
      dto.userId
    );
  }
}
