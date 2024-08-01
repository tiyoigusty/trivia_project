import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async buyDiamond(payment: CreatePaymentDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payment.user_id },
    });

    const diamond = await this.prismaService.diamond.findUnique({
      where: { id: payment.diamond_id },
    });

    const invoice = await this.prismaService.invoice.create({
      data: {
        userId: user.id,
        diamondId: diamond.id,
        amount: diamond.price,
      },
    });

    if (!invoice) throw new Error('invoice is not created');

    const dataMidtrans = {
      transaction_details: {
        order_id: user.id,
        gross_amount: invoice.amount,
      },
    };

    const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
    const encodedKey = Buffer.from(midtransServerKey + ':').toString('base64');

    const midtrans = await axios({
      method: 'post',
      url: `https://app.sandbox.midtrans.com/snap/v1/transactions`,
      data: dataMidtrans,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedKey}`,
      },
    });

    return midtrans.data;
  }

  async checkPaymentStatus(invoice_id: string) {
    try {
      const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
      const encodedKey = Buffer.from(midtransServerKey + ':').toString(
        'base64',
      );

      const confirm: any = await axios({
        method: 'get',
        url: `https://api.sandbox.midtrans.com/v2/${invoice_id}/status`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedKey}`,
        },
      });

      let statusInvoice;
      if (
        confirm.data.transaction_status === 'settlement' ||
        confirm.data.transaction_status === 'capture'
      ) {
        statusInvoice = await this.prismaService.invoice.update({
          where: {
            id: confirm.data.order_id,
          },
          data: {
            status: 'PAID',
          },
        });
        // await this.updateHistory(invoice_id, InvoiceStatus.PESANAN_BARU);
      } else if (confirm.data.transaction_status !== 'pending') {
        statusInvoice = await this.prismaService.invoice.update({
          where: {
            id: confirm.data.order_id,
          },
          data: {
            status: 'CANCLE',
          },
        });
        // await this.updateHistory(invoice_id, InvoiceStatus.PESANAN_BARU);
      }
      return statusInvoice;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
