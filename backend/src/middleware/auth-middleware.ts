import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private client: OAuth2Client;

  constructor(private readonly prismaService: PrismaService) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    //Bearer Token Check
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    try {
      const ticket = await this.client.getTokenInfo(token);
      // console.log('ticket', ticket);
      const user = await this.prismaService.user.findUnique({
        where: { google_id: ticket.sub },
      });

      res.locals.user = user;
      //   console.log('this', user);
      next();
    } catch (err) {
      return res.status(401).json(err.message);
    }
  }
}
