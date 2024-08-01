import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MidtransModule } from './midtrans/midtrans.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService],
  imports: [MidtransModule],
})
export class PaymentModule {}
