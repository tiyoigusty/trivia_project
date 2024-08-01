import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayService } from './gateway/gateway.service';
import { GatewayModule } from './gateway/gateway.module';
import { AvatarModule } from './avatar/avatar.module';
import { PrismaService } from './prisma/prisma.service';
import { DiamondModule } from './diamond/diamond.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [GatewayModule, AvatarModule, DiamondModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService, GatewayService, PrismaService],
})
export class AppModule {}
