import { Injectable } from '@nestjs/common';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class PaymentService {
  private readonly MIDTRANS_URL = 'https://api.sandbox.midtrans.com/v2/charge';
  private readonly BEARER_TOKEN = 'your-bearer-token'; // Ganti dengan Bearer Token yang valid

  constructor(private readonly httpService: HttpService) { }

  async createTransaction(orderId: string, amount: number): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpService.post(
        this.MIDTRANS_URL,
        {
          transaction_details: {
            order_id: orderId,
            gross_amount: amount,
          },
          payment_type: 'credit_card', // Ubah sesuai jenis pembayaran yang Anda dukung
        },
        {
          headers: {
            Authorization: `Bearer ${this.BEARER_TOKEN}`, // Gunakan Bearer Token di sini
            'Content-Type': 'application/json',
          },
        }
      ).toPromise();

      // console.log(response);

      return response.data; // Mengembalikan data dari respons
    } catch (error) {
      console.error('Error creating transaction:', error.message);
      throw error;
    }
  }
}
