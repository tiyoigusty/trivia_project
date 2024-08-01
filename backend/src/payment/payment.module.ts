import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { MidtransService } from './midtrans/midtrans.service';
import { MidtransModule } from './midtrans/midtrans.module';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [PaymentController],
  providers: [PaymentService, MidtransService, PrismaService],
  imports: [HttpModule, MidtransModule],
})
export class PaymentModule { }
