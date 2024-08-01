import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PaymentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
