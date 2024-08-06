import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { AvatarService } from './avatar/avatar.service';
import { DiamondModule } from './diamond/diamond.module';
import { DiamondService } from './diamond/diamond.service';
import { AuthMiddleware } from './middleware/auth-middleware';
import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersTestModule } from './users-test/users-test.module';
import { GoogleController } from './auth/google/google.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule,
    DiamondModule,
    PaymentModule,
    AvatarModule,
    UsersTestModule,
  ],
  controllers: [AppController, GoogleController],
  providers: [
    AppService,
    DiamondService,
    PrismaService,
    PaymentService,
    AvatarService,
    AuthService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'avatar', method: RequestMethod.ALL },
        { path: 'avatar/user', method: RequestMethod.ALL },
        { path: 'avatar/change-avatar/:avatarId', method: RequestMethod.ALL },
        { path: 'avatar/buy-avatar/:avatarId', method: RequestMethod.ALL },
      );
    // .forRoutes({ path: 'users', method: RequestMethod.ALL }); // ganti 'protected-route' dengan path rute yang ingin Anda lindungi
  }
}
