import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class PaymentService {
  private readonly MIDTRANS_SERVER_KEY = 'SB-Mid-server-_PJXDHgi73aiTcDs1-QoU7ae';
  private readonly MIDTRANS_URL = 'https://api.midtrans.com/v2/charge';
  constructor(private readonly httpService: HttpService) { }

  async createTransaction(orderId: string, amount: number): Promise<any> {
    const response: AxiosResponse = await this.httpService.post(
      this.MIDTRANS_URL,
      {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        payment_type: '', // Or 'credit_card', 'bank_transfer', etc.
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MIDTRANS_SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    ).toPromise();
    return response.data;
  }
}
