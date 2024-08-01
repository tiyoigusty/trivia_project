import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';

@Injectable()
export class AvatarService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAvatarDto: CreateAvatarDto) {
    const avatar = await this.prismaService.avatar.create({
      data: createAvatarDto,
    });
    return avatar;
  }

  async findAll() {
    return await this.prismaService.avatar.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.avatar.findFirst({
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prismaService.avatar.delete({
      where: { id },
    });
  }
}
