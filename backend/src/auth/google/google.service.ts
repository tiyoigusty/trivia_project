import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleState } from '../type/oAuth';
import { Request } from 'express';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.NEST_NGROK_URL}/google/redirect`,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const state: GoogleState = JSON.parse(
      (request.query.state as string) ?? '{}',
    );

    request['googleState'] = {};
    request['googleState']['redirectTo'] = state.redirectTo;

    // console.log('ini profile', profile);

    const { name, emails, id } = profile;

    let user = await this.prisma.user.findUnique({
      where: { google_id: id },
    });
    console.log('ini user', user);

    if (!user) {
      // Jika pengguna belum ada, buat pengguna baru
      user = await this.prisma.user.create({
        data: {
          email: emails[0].value,
          name: name.givenName + ' ' + name.familyName,
          google_id: id,
        },
      });

      const freeAvatar = await this.prisma.avatar.findMany({
        where: { coin: 0, diamond: 0 },
      });

      freeAvatar.forEach(async (data) => {
        await this.prisma.userAvatar.create({
          data: { userId: user.id, avatarId: data.id },
        });
      });
    }

    done(null, { ...user, accessToken });
  }
}
