import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserAvatarDto } from './dto/user.dto';
import { UserService } from './user.service';

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
