import {
  AuthenticationResponseMessage,
  CreateUserDto,
  LoggedUserRdo,
  LoginUserDto,
  UpdateUserDto,
} from '@backend/authentication';
import { createStaticUrlForFile } from '@backend/helpers';
import { InjectUserIdInterceptor } from '@backend/interceptors';
import { EntityConstrain, SERVE_ROOT } from '@backend/shared/core';
import {
  ShopUserQuery,
  UserRdo,
  UserWithPaginationRdo,
} from '@backend/shop-user';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
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
import { plainToInstance } from 'class-transformer';
import 'multer';
import * as url from 'node:url';
import { ApiSection, ApplicationServiceURL } from './app.config';
import { AppService } from './app.service';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserRoleGuard } from './guards/user-role.guard';

const DEFAULT_AVATAR_PATH = `${ApplicationServiceURL.File}/${SERVE_ROOT}/default-avatar.jpg`;

@Controller('users')
@UseFilters(AxiosExceptionFilter)
@ApiTags(ApiSection.User)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: EntityConstrain.user.avatar.maxFileSize,
          }),
          new FileTypeValidator({
            fileType: EntityConstrain.user.avatar.mimeTypes,
          }),
        ],
        fileIsRequired: false,
      })
    )
    avatar?: Express.Multer.File
  ) {
    const newUserDto = plainToInstance(CreateUserDto, {
      ...dto,
      avatar: DEFAULT_AVATAR_PATH,
    });

    if (avatar) {
      newUserDto.avatar = await this.appService.uploadFile(avatar);
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/register`,
      newUserDto
    );

    return data;
  }

  @Patch('update')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.PasswordUpdated,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.Unauthorized,
  })
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  public async update(
    @Body() dto: UpdateUserDto,
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: EntityConstrain.user.avatar.maxFileSize,
          }),
          new FileTypeValidator({
            fileType: EntityConstrain.user.avatar.mimeTypes,
          }),
        ],
        fileIsRequired: false,
      })
    )
    avatar?: Express.Multer.File
  ) {
    const updateUserDto = plainToInstance(UpdateUserDto, {
      ...dto,
    });

    if (avatar) {
      updateUserDto.avatar = await this.appService.uploadFile(avatar);
    }

    const { data } = await this.httpService.axiosRef.patch<UserRdo>(
      `${ApplicationServiceURL.Auth}/update`,
      updateUserDto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    data.avatar = createStaticUrlForFile(
      data.avatar,
      ApplicationServiceURL.File
    );

    return data;
  }

  @Post('login')
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post<LoggedUserRdo>(
      `${ApplicationServiceURL.Auth}/login`,
      loginUserDto
    );

    return data;
  }

  @Get(':id')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.Unauthorized,
  })
  public async show(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Auth}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    data.avatar = createStaticUrlForFile(
      data.avatar,
      ApplicationServiceURL.File
    );

    return data;
  }

  @Get()
  @UseGuards(CheckAuthGuard, UserRoleGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiQuery({ type: ShopUserQuery })
  @ApiResponse({
    type: UserWithPaginationRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.Unauthorized,
  })
  public async index(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get<UserWithPaginationRdo>(
      `${ApplicationServiceURL.Users}?${url.parse(req.url).query}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    data.entities.map((user) => {
      user.avatar = createStaticUrlForFile(
        user.avatar,
        ApplicationServiceURL.File
      );
    });

    return data;
  }

  @Post('refresh')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Get a new access/refresh tokens',
  })
  @ApiBearerAuth('refreshToken')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserFound,
  })
  @Post('check')
  public async checkToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Auth}/check`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}
