import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  async pay(@Body() payment: CreatePaymentDto) {
    return await this.paymentService.buyDiamond(payment);
  }

  @Get('status/:invoice')
  async midtransStatus(@Param('invoice') invoiceId: string) {
    return await this.paymentService.checkPaymentStatus(invoiceId);
  }
}
