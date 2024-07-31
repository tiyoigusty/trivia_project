import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MidtransModule } from './midtrans/midtrans.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [MidtransModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
