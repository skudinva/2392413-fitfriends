import {
  RequestWithTokenPayload,
  RequestWithTokenPayloadUrl,
} from '@backend/authentication';
import { InjectUserIdInterceptor } from '@backend/interceptors';
import { SortDirection, SortType } from '@backend/shared/core';
import {
  CreatePostDto,
  CreatePostFileDto,
  TrainingRdo,
  TrainingResponse,
  TrainingWithPaginationRdo,
  UpdatePostDto,
  UpdatePostFileDto,
  UserIdDto,
} from '@backend/training';
import {
  CreateCommentDto,
  TrainingCommentRdo,
  TrainingCommentResponse,
  TrainingCommentWithPaginationRdo,
} from '@backend/training-comment';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostType } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import 'multer';
import * as url from 'node:url';
import { ApiSection, ApplicationServiceURL } from './app.config';
import { AppService } from './app.service';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthForceGuard } from './guards/check-auth-force.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Controller('trainings')
@UseFilters(AxiosExceptionFilter)
export class TrainingController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService
  ) {}

  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: TrainingResponse.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.PostNotFound,
  })
  @Post('/')
  @ApiTags(ApiSection.Training)
  public async createPost(
    @Body() dto: CreatePostFileDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          /*new MaxFileSizeValidator({
            maxSize: FieldValidate.MaxFileSizeForPost,
          }),
          new FileTypeValidator({
            fileType: FieldValidate.AllowedImageFileType,
          }),*/
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    const postDto = plainToInstance(
      CreatePostDto,
      JSON.parse(String(dto.training))
    );

    if (file) {
      postDto.extraProperty.photo = await this.appService.uploadFile(file);
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Training}/`,
      postDto
    );

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/incPostsCount`,
      { userId: postDto.userId }
    );
    return data;
  }

  @Post('/repost/:trainingId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: TrainingResponse.PostCreated,
  })
  @ApiTags(ApiSection.Training)
  public async createRepost(
    @Param('trainingId') trainingId: string,
    @Body() dto: UserIdDto
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Training}/repost/${trainingId}`,
      dto
    );

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/incPostsCount`,
      { userId: dto.userId }
    );

    return data;
  }

  @Patch('/:id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: TrainingResponse.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingResponse.AccessDeny,
  })
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiTags(ApiSection.Training)
  public async updatePost(
    @Param('id') id: string,
    @Body() dto: UpdatePostFileDto,
    @UploadedFile(
      new ParseFilePipe({
        /*  validators: [
          new MaxFileSizeValidator({
            maxSize: FieldValidate.MaxFileSizeForPost,
          }),
          new FileTypeValidator({
            fileType: FieldValidate.AllowedImageFileType,
          }),
        ],*/
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    const postDto = plainToInstance(
      UpdatePostDto,
      JSON.parse(String(dto.training))
    );

    if (file) {
      postDto.extraProperty.photo = await this.appService.uploadFile(file);
    }

    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Training}/${id}`,
      postDto
    );

    return data;
  }

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingResponse.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingResponse.AccessDeny,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiTags(ApiSection.Training)
  public async deletePost(
    @Param('id') id: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Training}/${id}/${userId}`
    );

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/decPostsCount`,
      { userId }
    );
    return data;
  }

  @ApiResponse({
    type: TrainingWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingResponse.PostsFound,
  })
  @ApiQuery({
    name: 'tags',
    required: false,
    type: [String],
    description: 'Tags',
  })
  @ApiQuery({
    name: 'sortDirection',
    required: true,
    enum: SortDirection,
    description: 'Sort direction',
  })
  @ApiQuery({
    name: 'sortBy',
    required: true,
    enum: SortType,
    description: 'Sort by',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    example: 1,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term',
  })
  @ApiQuery({
    name: 'postUserId',
    required: false,
    type: String,
    example: '677cd8d75ff92067f1de5911',
    description: 'Author id of the post',
  })
  @ApiQuery({
    name: 'postType',
    required: false,
    enum: PostType,
    description: 'Training type',
  })
  @Get('/')
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthForceGuard)
  @ApiTags(ApiSection.Training)
  public async getPosts(@Req() req: RequestWithTokenPayloadUrl) {
    const userId = req.user?.sub;
    const requestUrl = userId ? `${req.url}&userId=${userId}` : req.url;
    const query = url.parse(requestUrl).query;

    const { data } =
      await this.httpService.axiosRef.get<TrainingWithPaginationRdo>(
        `${ApplicationServiceURL.Training}?${query}`
      );
    await this.appService.appendUserInfo(data.entities);
    return data;
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: TrainingResponse.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.PostNotFound,
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthForceGuard)
  @Get('/:id')
  @ApiTags(ApiSection.Training)
  public async getPost(
    @Param('id') id: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user?.sub;
    const { data } = await this.httpService.axiosRef.get<TrainingRdo>(
      `${ApplicationServiceURL.Training}/${id}/${userId}`
    );
    await this.appService.appendUserInfo([data]);

    return data;
  }

  @Post('/like/:trainingId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingResponse.Like,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingResponse.LikeAlreadyExists,
  })
  @ApiTags(ApiSection.Like)
  public async addLike(
    @Param('trainingId') trainingId: string,
    @Body() dto: UserIdDto
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Training}/like/${trainingId}`,
      dto
    );

    return data;
  }

  @Post('/unlike/:trainingId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingResponse.UnLike,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: TrainingResponse.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingResponse.LikeNotExists,
  })
  @ApiTags(ApiSection.Like)
  public async deleteLike(
    @Param('trainingId') trainingId: string,
    @Body() dto: UserIdDto
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Training}/unlike/${trainingId}`,
      dto
    );

    return data;
  }

  @ApiResponse({
    type: TrainingCommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: TrainingCommentResponse.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.PostNotFound,
  })
  @ApiQuery({
    name: 'sortDirection',
    required: true,
    enum: SortDirection,
    description: 'Sort direction',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @Get('/comments/:trainingId')
  @ApiTags(ApiSection.Comment)
  public async show(
    @Param('trainingId') trainingId: string,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Comments}/${trainingId}?${
        url.parse(req.url).query
      }`
    );

    return data;
  }

  @Post('/comments/:trainingId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: TrainingCommentRdo,
    status: HttpStatus.CREATED,
    description: TrainingCommentResponse.CommentCreated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.PostNotFound,
  })
  @ApiTags(ApiSection.Comment)
  public async create(
    @Param('trainingId') trainingId: string,
    @Body() dto: CreateCommentDto
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Comments}/${trainingId}`,
      dto
    );

    return data;
  }

  @Delete('/comments/:commentId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: TrainingCommentResponse.CommentDeleted,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingCommentResponse.CommentNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: TrainingCommentResponse.NotAllowed,
  })
  @ApiTags(ApiSection.Comment)
  public async delete(
    @Param('commentId') commentId: string,
    @Req() req: RequestWithTokenPayload
  ) {
    const userId = req.user.sub;
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Comments}/${commentId}/${userId}`
    );

    return data;
  }

  @Post('/sendNewPostNotify')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('accessToken')
  @ApiTags(ApiSection.Training)
  public async sendNewPostNotify(@Body() dto: UserIdDto) {
    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Training}/sendNewPostNotify`,
      dto
    );
  }
}
