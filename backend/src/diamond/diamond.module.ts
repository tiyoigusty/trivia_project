import { Module } from '@nestjs/common';
import { DiamondService } from './diamond.service';
import { DiamondController } from './diamond.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DiamondController],
  providers: [DiamondService, PrismaService],
})
export class DiamondModule {}
