import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import app from 'src/config/app';
import swagger from 'src/config/swagger';
import { JwtAuthGuard } from '../auth/app/jwt/jwt-auth-guard';
import { AuthModule } from '../auth/auth-module';
import { ExchangeModule } from '../exchange/exchange-module';
import { UserModule } from '../user/user-module';
import { AppController } from './app-controller';
import { AppService } from './app-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, swagger],
    }),
    AuthModule,
    UserModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
