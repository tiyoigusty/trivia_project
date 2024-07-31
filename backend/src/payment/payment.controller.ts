import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('create')
  async createTransaction(@Body() body: { orderId: string, amount: number }) {
    return this.paymentService.createTransaction(body.orderId, body.amount);
  }
}
