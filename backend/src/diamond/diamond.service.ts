import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiamondService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    const diamond = await this.prismaService.diamond.findMany({
      orderBy: { price: 'asc' },
    });
    return diamond;
  }
}
