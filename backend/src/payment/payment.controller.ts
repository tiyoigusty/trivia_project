import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MidtransService } from './midtrans/midtrans.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly midtransService: MidtransService) { }

  @Post('create')
  async create() {
    return this.midtransService.pay();
  }
}
