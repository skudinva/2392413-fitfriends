import {
  RequestWithTokenPayload,
  RequestWithTokenPayloadUrl,
} from '@backend/authentication';
import { FriendQuery, FriendWithPaginationRdo } from '@backend/friend';
import { fillDto } from '@backend/helpers';
import { InjectUserIdInterceptor } from '@backend/interceptors';
import { UserWithPaginationRdo } from '@backend/shop-user';
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
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
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

  @Post(':friendId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    type: UserWithPaginationRdo,
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  public async addFriend(
    @Req() req: RequestWithTokenPayload,
    @Param('friendId') friendId: string
  ) {
    const userId = req.user.sub;
    const { data } =
      await this.httpService.axiosRef.post<UserWithPaginationRdo>(
        `${ApplicationServiceURL.Friends}/${userId}/${friendId}`
      );
    // await this.appService.appendUserInfo([data]);
    return data;
  }

  @Delete('/:friendId')
  @UseGuards(CheckAuthGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
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
