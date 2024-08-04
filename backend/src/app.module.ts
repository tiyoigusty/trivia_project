import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DiamondService } from './diamond/diamond.service';
import { PrismaService } from './prisma/prisma.service';
import { DiamondModule } from './diamond/diamond.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';
import { AvatarModule } from './avatar/avatar.module';
import { AvatarService } from './avatar/avatar.service';
import { UsersTestModule } from './users-test/users-test.module';

@Module({
  imports: [
    AuthModule,
    DiamondModule,
    PaymentModule,
    AvatarModule,
    UsersTestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DiamondService,
    PrismaService,
    PaymentService,
    AvatarService,
  ],
})
export class AppModule {}
