import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private avatarService: AvatarService) {}

  @Get()
  async getAllAvatars() {
    const avatars = await this.avatarService.getAllAvatar();
    return {
      success: true,
      message: 'avatar retreived successfully',
      data: avatars,
    };
  }

  @Get(':id')
  async getAvatarsbyId(@Param('id') id: string) {
    const avatars = await this.avatarService.findAvatarById(id);
    if (!avatars) {
      throw new NotFoundException({
        success: false,
        message: `Avatar with ID ${id} not found`,
      });
    }
    return {
      success: true,
      message: 'avatar retreived successfully',
      data: avatars,
    };
  }
}
