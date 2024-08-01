import { Controller, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserAvatarDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id/update-avatar')
  async updateAvatar(
    @Param('id') userId: string,
    @Body() updateData: UpdateUserAvatarDto,
  ) {
    try {
      const updatedUser = await this.userService.updateUserAvatar(
        userId,
        updateData,
      );
      return {
        success: true,
        message: 'user avatar updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update user avatar',
      };
    }
  }
}
