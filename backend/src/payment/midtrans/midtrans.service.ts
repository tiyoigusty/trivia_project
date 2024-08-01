import { Injectable } from '@nestjs/common';
import { Midtrans } from '@miwone/midtrans-client-typescript';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MidtransService {
    serverKey: any;
    // private readonly MIDTRANS_URL = 'https://api.sandbox.midtrans.com/v2/charge'; // Sandbox URL
    // private readonly MIDTRANS_SERVER_KEY = 'SB-Mid-server-_PJXDHgi73aiTcDs1-QoU7ae'; // Server Key

    constructor(private readonly prismaService: PrismaService) { } // Menyuntikkan HttpService melalui konstruktor

    async pay() {

        const snap = new Midtrans.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-_PJXDHgi73aiTcDs1-QoU7ae',
            clientKey: 'SB-Mid-client-eRw0nrhf0VgaM10u',
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

        // console.log(transaction);

        return transaction.token;
    }
}
