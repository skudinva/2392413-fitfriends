import { fillDto } from '@backend/helpers';
import { UserWithPaginationRdo } from '@backend/shop-user';
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

@Controller('friend')
@ApiTags('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get()
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    type: UserWithPaginationRdo,
    status: HttpStatus.OK,
  })
  public async index(@Query() query: FriendQuery) {
    const friendsWithPagination = await this.friendService.getFriends(query);
    const result = {
      ...friendsWithPagination,
      entities: friendsWithPagination.entities.map((friend) => friend.toPOJO()),
    };
    return fillDto(UserWithPaginationRdo, result);
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
