import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUsersTestDto } from './dto/create-users-test.dto';
import { UsersTestService } from './users-test.service';

@Controller('users-test')
export class UsersTestController {
  constructor(private readonly usersTestService: UsersTestService) {}

  @Post()
  async create(@Body() createUsersTestDto: CreateUsersTestDto) {
    return await this.usersTestService.create(createUsersTestDto);
  }

  @Get()
  async getUser() {
    return await this.usersTestService.getUser();
  }

  @Patch(':id')
  async update(@Param('id') id: string) {
    return this.usersTestService.update(id);
  }
}
