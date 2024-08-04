import { Module } from '@nestjs/common';
import { UsersTestService } from './users-test.service';
import { UsersTestController } from './users-test.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersTestController],
  providers: [UsersTestService, PrismaService],
})
export class UsersTestModule {}
