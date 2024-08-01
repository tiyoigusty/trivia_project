import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { PrismaService } from 'src/prisma.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://ae9b-182-253-54-251.ngrok-free.app/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, id, photos } = profile;

    // Cek apakah pengguna sudah ada di database
    let user = await this.prisma.user.findUnique({
      where: { google_id: id },
    });

    if (!user) {
      // Jika pengguna belum ada, buat pengguna baru
      user = await this.prisma.user.create({
        data: {
          email: emails[0].value,
          name: name.givenName + ' ' + name.familyName,
          avatar: photos[0].value,
          google_id: id,
          coin: 0,
          diamond: 0,
        },
      });
    }

    done(null, user);
  }
}
