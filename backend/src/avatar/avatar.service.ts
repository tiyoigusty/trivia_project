import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvatarService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAvatar() {
    const avatar = await this.prismaService.avatar.findMany();

    return avatar;
  }

  async findUserAvatar(id: string) {
    return await this.prismaService.userAvatar.findMany({
      where: { userId: id },
      include: { Avatar: true },
      orderBy: { created_at: 'asc' },
    });
  }

  async changeAvatar(userId: string, avatarId: string) {
    try {
      await this.prismaService.userAvatar.updateMany({
        where: { userId },
        data: { is_active: false },
      });

      const useAvatar = await this.prismaService.userAvatar.update({
        where: { id: avatarId },
        data: { is_active: true },
      });

      return useAvatar;
    } catch (error) {
      throw new Error(error);
    }
  }

  async buyAvatar(userid: string, avatarId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userid },
        include: { user_avatar: true },
      });

      if (!user) {
        throw new Error('User not found!');
      }

      const avatar = await this.prismaService.avatar.findUnique({
        where: { id: avatarId },
      });

      if (!avatar) {
        throw new Error('Avatar not found!');
      }

      if (user.coin < avatar.coin || user.diamond < avatar.diamond) {
        throw new Error('Your coins or diamond is not enough!');
      }

      if (avatar.coin) {
        await this.prismaService.user.update({
          where: { id: user.id },
          data: {
            coin: {
              decrement: avatar.coin,
            },
          },
        });
      } else if (avatar.diamond) {
        await this.prismaService.user.update({
          where: { id: user.id },
          data: {
            diamond: {
              decrement: avatar.diamond,
            },
          },
        });
      }

      await this.prismaService.userAvatar.create({
        data: {
          userId: user.id,
          avatarId: avatarId,
          is_active: false,
        },
      });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUser(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        user_avatar: {
          include: { Avatar: true },
        },
      },
    });

    return user;
  }
}
