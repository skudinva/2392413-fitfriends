import {
  RequestWithTokenPayload,
  RequestWithTokenPayloadUrl,
} from '@backend/authentication';
import {
  FriendQuery,
  FriendWithPaginationRdo,
  UserIdRdo,
} from '@backend/friend';
import { fillDto } from '@backend/helpers';
import { InjectUserIdInterceptor } from '@backend/interceptors';
import { UserRdo, UserWithPaginationRdo } from '@backend/shop-user';
import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import 'multer';
import * as url from 'node:url';
import { ApiSection, ApplicationServiceURL } from './app.config';
import { AppService } from './app.service';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserRoleGuard } from './guards/user-role.guard';

@Controller('friends')
@UseFilters(AxiosExceptionFilter)
@ApiTags(ApiSection.Friend)
export class FriendsController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService
  ) {}

  @ApiResponse({
    type: UserWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Friend found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Friends not found',
  })
  @ApiQuery({ type: FriendQuery })
  @Get()
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  public async getFriends(@Req() req: RequestWithTokenPayloadUrl) {
    const userId = req.user.sub;

    const { data } =
      await this.httpService.axiosRef.get<FriendWithPaginationRdo>(
        `${ApplicationServiceURL.Friends}/?${
          url.parse(req.url).query
        }&userId=${userId}`
      );
    const friends = await this.appService.composeUserInfo(data.entities);

    return fillDto(UserWithPaginationRdo, {
      ...data,
      entities: friends,
    });
  }

  @Get(':friendId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: Boolean,
    status: HttpStatus.OK,
    description: 'Friend status successful get',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Some error',
  })
  public async getFriendStatus(
    @Req() req: RequestWithTokenPayload,
    @Param('friendId') friendId: string
  ) {
    const userId = req.user.sub;
    const { data } = await this.httpService.axiosRef.get<boolean>(
      `${ApplicationServiceURL.Friends}/${userId}/${friendId}`
    );

    return data;
  }

  @Post(':friendId')
  @UseGuards(CheckAuthGuard, UserRoleGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'Friend successful added',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Friend not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Some error',
  })
  public async addFriend(
    @Req() req: RequestWithTokenPayload,
    @Param('friendId') friendId: string
  ) {
    const userId = req.user.sub;
    const { data } = await this.httpService.axiosRef.post<UserIdRdo>(
      `${ApplicationServiceURL.Friends}/${userId}/${friendId}`
    );
    const friend = await this.appService.composeUserInfo([data]);
    return friend[0];
  }

  @Delete('/:friendId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Friend successful deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Friend not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Some error',
  })
  public async deleteFriend(
    @Req() req: RequestWithTokenPayload,
    @Param('friendId') friendId: string
  ) {
    const userId = req.user.sub;
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Friends}/${userId}/${friendId}`
    );
  }
}
