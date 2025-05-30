import { fillDto } from '@backend/helpers';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FriendQuery } from './friend.query';
import { FriendService } from './friend.service';
import { FriendWithPaginationRdo } from './rdo/friend-with-pagination.rdo';

@Controller('friend')
@ApiTags('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    type: FriendWithPaginationRdo,
    status: HttpStatus.OK,
  })
  public async index(@Query() query: FriendQuery) {
    const friendsWithPagination = await this.friendService.getFriends(query);
    const friends = fillDto(FriendWithPaginationRdo, friendsWithPagination);
    return friends;
  }

  @Post(':userId/:friendId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Add friend',
  })
  public async create(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string
  ) {
    return await this.friendService.create(userId, friendId);
  }

  @Delete(':userId/:friendId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete friend',
  })
  public async delete(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string
  ) {
    await this.friendService.delete(userId, friendId);
  }
}
