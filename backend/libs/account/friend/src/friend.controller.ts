import { fillDto } from '@backend/helpers';
import { MongoIdValidationPipe } from '@backend/pipes';
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
import { UserIdRdo } from './rdo/user-id.rdo';

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

  @Get(':userId/:friendId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get friend status',
  })
  public async getFriendStatus(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Param('friendId', MongoIdValidationPipe) friendId: string
  ) {
    return await this.friendService.getFriendStatus(userId, friendId);
  }

  @Post(':userId/:friendId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Add friend',
    type: UserIdRdo,
  })
  public async create(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Param('friendId', MongoIdValidationPipe) friendId: string
  ) {
    const friendEntity = await this.friendService.create(userId, friendId);
    const friend = fillDto(UserIdRdo, friendEntity);
    return friend;
  }

  @Delete(':userId/:friendId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete friend',
  })
  public async delete(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Param('friendId', MongoIdValidationPipe) friendId: string
  ) {
    await this.friendService.delete(userId, friendId);
  }
}
