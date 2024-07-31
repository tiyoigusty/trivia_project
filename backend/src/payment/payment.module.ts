import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MidtransModule } from './midtrans/midtrans.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [MidtransModule],
})
export class PaymentModule {}
