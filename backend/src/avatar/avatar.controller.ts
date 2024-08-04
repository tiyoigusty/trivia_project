import { Controller, Get, Param, Post } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get()
  async findFree() {
    return await this.avatarService.findAvatar();
  }

  @Get('user-avatar/:id')
  async findUserAvatar(@Param('id') id: string) {
    return await this.avatarService.findUserAvatar(id);
  }

  @Post(':userId/:avatarId')
  async updateAvatarUser(
    @Param('userId') userId: string,
    @Param('avatarId') avatarId: string,
  ) {
    return await this.avatarService.changeAvatar(userId, avatarId);
  }

  @Post('buy-avatar/:userId/:avatarId')
  async buyAvatar(
    @Param('userId') userId: string,
    @Param('avatarId') avatarId: string,
  ) {
    return await this.avatarService.buyAvatar(userId, avatarId);
  }

  @Get('user/:id')
  async findone(@Param('id') id: string) {
    return await this.avatarService.findUser(id);
  }
}
