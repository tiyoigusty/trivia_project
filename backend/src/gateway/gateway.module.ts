import { Module } from '@nestjs/common';
import { SocketService } from './gateway.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SocketService, PrismaService],
})
export class GatewayModule {}
