import { Body, Controller, Post } from '@nestjs/common';
import { CreateConfirmDto, CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  async pay(@Body() payment: CreatePaymentDto) {
    return await this.paymentService.buyDiamond(payment);
  }

  @Post('confirm')
  async confirm(@Body() confirmation: CreateConfirmDto) {
    // console.log('ini confirm', confirmation);

    return await this.paymentService.confirmPayment(confirmation);
  }
}
