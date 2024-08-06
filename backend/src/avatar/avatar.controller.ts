import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-avatar.dto';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findFree(@Res() res: Response) {
    const id = res.locals.user.id;
    console.log('ini id', id);

    const avatar = await this.avatarService.findAvatar(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User successfully updated',
      data: avatar,
    });
  }

  @Get('user-avatar/:id')
  async findUserAvatar(@Param('id') id: string) {
    return await this.avatarService.findUserAvatar(id);
  }

  @Patch('change-avatar/:avatarId')
  @HttpCode(HttpStatus.OK)
  async updateAvatarUser(
    @Res() res: Response,
    @Param('avatarId') avatarId: string,
  ) {
    const id = res.locals.user.id;
    // console.log('user id controller', id);

    const updateAvatar = await this.avatarService.changeAvatar(id, avatarId);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User successfully updated',
      data: updateAvatar,
    });
  }

  @Post('buy-avatar/:avatarId')
  @HttpCode(HttpStatus.OK)
  async buyAvatar(@Res() res: Response, @Param('avatarId') avatarId: string) {
    const id = res.locals.user.id;
    const buyAvatar = await this.avatarService.buyAvatar(id, avatarId);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User successfully updated',
      data: buyAvatar,
    });
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  async findone(@Res() res: Response) {
    const id = res.locals.user.id;
    // console.log('ini id', id);

    const user = await this.avatarService.findUser(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User successfully updated',
      data: user,
    });
  }

  @Patch('user')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Res() res: Response, @Body() updateUser: UpdateUserDto) {
    const id = res.locals.user.id;

    const updatedUser = await this.avatarService.changeUser(id, updateUser);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User successfully updated',
      data: updatedUser,
    });
  }
}
