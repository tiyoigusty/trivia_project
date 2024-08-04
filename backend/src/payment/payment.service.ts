import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConfirmDto, CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async buyDiamond(payment: CreatePaymentDto) {
    try {
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
          order_id: invoice.id,
          gross_amount: invoice.amount,
        },
      };

      const midtransServerKey = process.env.MIDTRANS_SERVER_KEY;
      const encodedKey = Buffer.from(midtransServerKey + ':').toString(
        'base64',
      );

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
    } catch (error) {
      throw new Error(error);
    }
  }

  async confirmPayment(confirmation: CreateConfirmDto) {
    try {
      const invoice = await this.prismaService.invoice.findUnique({
        where: { id: confirmation.order_id },
      });

      if (!invoice) throw new Error('invoice not found!');

      if (
        confirmation.transaction_status === 'settlement' ||
        confirmation.transaction_status === 'capture'
      ) {
        await this.prismaService.invoice.update({
          where: { id: confirmation.order_id },
          data: { status: 'PAID' },
        });
      } else if (confirmation.transaction_status === 'pending') {
        await this.prismaService.invoice.update({
          where: { id: confirmation.order_id },
          data: { status: 'CANCLE' },
        });
      }

      const diamond = await this.prismaService.diamond.findUnique({
        where: { id: invoice.diamondId },
      });

      const user = await this.prismaService.user.update({
        where: { id: invoice.userId },
        data: { diamond: { increment: diamond.quantity } },
      });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
