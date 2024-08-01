import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [MidtransService, PrismaService],
})
export class MidtransModule { }
