import { Module } from '@nestjs/common';
import { MatchService, RoomService, SocketService } from './gateway.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SocketService, PrismaService, MatchService, RoomService],
})
export class GatewayModule {}
