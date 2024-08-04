import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsersTestDto } from './dto/create-users-test.dto';

@Injectable()
export class UsersTestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUsersTestDto: CreateUsersTestDto) {
    const user = await this.prismaService.user.create({
      data: createUsersTestDto,
    });

    const freeAvatar = await this.prismaService.avatar.findMany({
      where: { coin: 0, diamond: 0 },
    });

    freeAvatar.forEach(async (data) => {
      await this.prismaService.userAvatar.create({
        data: { userId: user.id, avatarId: data.id },
      });
    });

    return user;
  }

  async getUser() {
    return await this.prismaService.user.findMany({
      include: { user_avatar: { include: { Avatar: true } } },
    });
  }

  async update(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    const updateUserAvatar = await this.prismaService.userAvatar.update({
      where: { id: user.id },
      data: { is_active: true },
    });
    return updateUserAvatar;
  }
}
