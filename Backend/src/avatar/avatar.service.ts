import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAvatarDto } from './dto/avatar.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateAvatarSchema } from './schema/avatar.schema';

@Injectable()
export class AvatarService {
  constructor(private prisma: PrismaService) {}

  async getAllAvatar() {
    return this.prisma.avatar.findMany();
  }

  async findAvatarById(id: string) {
    return this.prisma.avatar.findUnique({ where: { id } });
  }

  async createAvatar(createAvatarDto: CreateAvatarDto) {
    const parsedDto = CreateAvatarSchema.safeParse(createAvatarDto);
    if (!parsedDto.success) {
      throw new BadRequestException('invalid avatar data');
    }
    return this.prisma.avatar.create({
      data: {
        id: parsedDto.data.id,
        image: parsedDto.data.image,
      },
    });
  }
}
