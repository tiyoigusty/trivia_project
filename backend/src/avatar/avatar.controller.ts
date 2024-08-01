import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  create(@Body() createAvatarDto: CreateAvatarDto) {
    return this.avatarService.create(createAvatarDto);
  }

  @Get()
  findAll() {
    return this.avatarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avatarService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avatarService.remove(id);
  }
}
