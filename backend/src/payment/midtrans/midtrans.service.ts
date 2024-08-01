import { Midtrans } from '@miwone/midtrans-client-typescript';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MidtransService {
  async Pay() {
    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: 'SB-Mid-server-gEHNFjlsuyIXk635L5b-aMl-',
      clientKey: 'SB-Mid-client-dOiwTDQzyW6mHHxL',
    });

    const parameter = {
      transaction_details: {
        order_id: '1234',
        gross_amount: 200000,
      },
      credit_card: {
        secure: true,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    console.log(transaction.token);

    return transaction.token;
  }
}
