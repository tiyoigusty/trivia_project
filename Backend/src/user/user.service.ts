import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserAvatarDto } from './dto/user.dto';
import { UpdateUserAvatarSchema } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUserAvatar(
    userId: string,
    updateUserAvatarDto: UpdateUserAvatarDto,
  ) {
    const parsedDto = UpdateUserAvatarSchema.safeParse(updateUserAvatarDto);
    if (!parsedDto.success) {
      throw new BadRequestException('Invalid update Data');
    }

    const { avatarId, avatarImage, name } = parsedDto.data;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let avatar = null;
    if (avatarId) {
      avatar = await this.prisma.avatar.findUnique({ where: { id: avatarId } });
      if (!avatar) {
        throw new NotFoundException('Avatar not found');
      }
    } else {
      avatar = await this.prisma.avatar.create({
        data: { image: avatarImage },
      });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar: avatar.image,
        user_avatar: {
          create: {
            avatarId: avatar.id,
          },
        },
        name: name,
      },
    });
  }
}
